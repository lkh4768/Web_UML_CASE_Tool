StateFigure = draw2d.shape.layout.VerticalLayout.extend({

	NAME : "StateFigure",

	init : function(attr, setter, getter) {
		this._super($.extend({
			bgcolor : "#ffffff",
			stroke : 1,
			color : "#000000",
			radius : 5
		}, attr), setter, getter);

		// Compose the top row of the shape
		//
		this.stateLabel = new NameLabel({
			text : "state",
			stroke : 0
		});
		this.stereoTypeLabel = new StereoTypeLabel();
		this.setStereoType("");

		// 더블 클릭으로 이름 변경 가능하게 설정
		this.stateLabel.installEditor(new draw2d.ui.LabelInplaceEditor());

		// the middle part of the shape
		// This part contains the ports for the connection
		//
		var center = new draw2d.shape.basic.Rectangle({
			minwidth : 90,
			color : "#000000"
		});
		center.getHeight = function() {
			return 1;
		};

		// 포트 추가할 수 없게 설정
		this.setUserData({
			isAddPort : false
		});

		// 속성값 리스트.
		this.actionArray = new draw2d.util.ArrayList();

		// finally compose the shape with top/middle/bottom in VerticalLayout
		//
		this.stateLabel.add(this.stereoTypeLabel, new draw2d.layout.locator.TopLocator());
		this.add(this.stateLabel, new draw2d.layout.locator.CenterLocator());
		this.add(center);
		this.addAction();

	},

	getName : function() {
		return this.stateLabel.getText();
	},
	setName : function(text) {
		this.stateLabel.setText(text);
	},

	getStereoType : function() {
		return this.stereoTypeLabel.getText();
	},

	setStereoType : function(text) {

		this.stereoTypeLabel.setText(text);

	},
	getActionArray : function() {
		return this.actionArray;
	},

	addAction : function() {
		var actionLabel = new StateItemLabel();
		actionLabel.setActivity("action");
		actionLabel.setName("method");

		this.actionArray.add(actionLabel);

		this.add(actionLabel, null, this.actionArray.getSize() + 1);

		return actionLabel;
	},

	removeAction : function(action) {
		this.remove(action);
		this.actionArray.remove(action);
	},

	resetAction : function() {
		var _this = this;
		this.getChildren().each(function(i, children) {
			if (i > 1) {
				_this.removeAction(children);
			}
		});
	},

	/**
	 * @inheritdoc
	 */
	setDimension : function(w, h) {
		this._super(w + 100, h);

		var width = this.width;
		this.children.each(function(i, e) {
			if (e.figure.isResizeable() && e.figure.isVisible()) {
				e.figure.setDimension(width, e.figure.getMinHeight());
			}
		});

		return this;
	},

	/**
	 * @inheritdoc
	 */
	setCanvas : function(canvas) {
		this._super(canvas);
		var _this = this;
		this.getChildren().each(function(i, children) {
			_this.setWidth(children.getWidth() + 30);
		});
	},
	/**
	 * @inheritdoc
	 */
	getPersistentAttributes : function() {
		var memento = this._super();
		$.extend(memento, {
			name : this.getName(),
			stereotype : this.getStereoType()
		});

		if (this.actionArray != null) {
			memento.actions = [];
			this.actionArray.each(function(i, action) {
				memento.actions.push(action.getPersistentAttributes());
			});
		}

		if (typeof memento.ports !== "undefined") {
			$.each(memento.ports, $.proxy(function(i, e) {
				var x = this.getPort(e.name).getAbsoluteX() - this.getX();
				var y = this.getPort(e.name).getAbsoluteY() - this.getY();
				x = x / this.getWidth() * 100;
				y = y / this.getHeight() * 100;
				$.extend(e, {
					x : x,
					y : y
				});
			}, this));
		}

		return memento;
	},

	/**
	 * @inheritdoc
	 */
	setPersistentAttributes : function(memento) {
		this._super(memento);

		if (typeof memento.name !== "undefined") {
			this.setName(memento.name);
		}

		// this.setActionArray(memento.actionarray);

		if (typeof memento.stereotype !== "undefined") {
			this.setStereoType(memento.stereotype);
		}

		this.resetAction();

		if (typeof memento.actions !== "undefined") {
			var _this = this;
			$.each(memento.actions, $.proxy(function(i, e) {
				var actionLabel = _this.addAction();
				actionLabel.setPersistentAttributes(e);
			}));
		}

		if (typeof memento.ports !== "undefined") {
			// we read the ports from the JSON and now we save it to the JSON
			// too.
			this.persistPorts = true;

			// remove all ports created in the init method
			//
			this.resetPorts();

			// and restore all ports of the JSON document instead.
			//
			$.each(memento.ports, $.proxy(function(i, e) {
				var port = eval("new " + e.port + "()");
				var locator = eval("new " + e.locator + "(" + e.x + "," + e.y + ")");
				port.setPersistentAttributes(e);
				this.addPort(port, locator);
				port.setName(e.name);
			}, this));
		}
	},

	/**
	 * @method called by the framework if the figure should show the
	 *         contextmenu.</br> The strategy to show the context menu depends
	 *         on the plattform. Either loooong press or right click with the
	 *         mouse.
	 * 
	 * @param {Number}
	 *            x the x-coordinate to show the menu
	 * @param {Number}
	 *            y the y-coordinate to show the menu
	 * @since 1.1.0
	 */
	onContextMenu : function(x, y) {
		var ctMenuFactory = new ContextMenuFactoryInCanvas();
		ctMenuFactory.createContextMenu(this, x, y);
	},
	/**
	 * @method Called when a user clicks on the element. // You can
	 *         alternatively register an event handler with: figure.on("click",
	 *         function(emitter){ alert("user click on the figure"); });
	 * 
	 * @template
	 * @deprecated
	 */
	onClick : function(x, y) {
		if (this.getUserData().isAddPort === true) {
			var cmd = new CommandAddPort(this, x, y, true);
			this.getCanvas().getCommandStack().execute(cmd);
		}
	},

	/**
	 * @method Called when a user dbl clicks on the element // Alternatively you
	 *         register for this event with: figure.on("dblclick",
	 *         function(emitter){ alert("user dbl click on the figure"); }); 더블
	 *         클릭 시 포트추가
	 * @template
	 */
	onDoubleClick : function(x, y) {
		var cmd = new CommandAddPort(this, x, y, true);
		this.getCanvas().getCommandStack().execute(cmd);
	},
	/**
	 * @method Clone the figure. <br>
	 *         You must override and implement the methods
	 *         <b>getPersistentAttributes</b> and <b>setPersistentAttributes</b>
	 *         for your custom figures if the have special attributes.
	 * 
	 * @since 4.1.0
	 * @experimental
	 */
	clone : function() {
		var clone = new Clone();
		return clone.clone(this);
	}
});

CommunicationFigure = draw2d.shape.basic.Rectangle.extend({

	NAME : "CommunicationFigure",
	init : function(attr, setter, getter) {
		// 감싸고 있는 도형(sequence shape)의 크기 및 색
		this._super($.extend({
			stroke : 2,
			bgColor : "#ffffff"
		}, attr), setter, getter);

		this.stereoTypeLabel = new StereoTypeLabel();
		this.setStereoType("");

		// object(class) 도형 생성 및 설정
		this.nameLabel = new NameLabel({
			text : "communication",
			stroke : 0
		});

		// 포트 추가할 수 없게 설정
		this.setUserData({
			isAddPort : false
		});

		this.setHeight(this.nameLabel.getHeight() + 50);

		this.add(this.nameLabel, new draw2d.layout.locator.CenterLocator());

		this.nameLabel.on("resize", function() {
			this.setWidth(this.nameLabel.getWidth() + 30);
		}, this);

		this.add(this.stereoTypeLabel, new draw2d.layout.locator.TopLocator());

		// 오른쪽 클릭 가능하게 하기 위해
		this.nameLabel.on("resize", function() {
			this.setWidth(this.nameLabel.getWidth() + 30);
		}, this);

	},
	getName : function() {
		return this.nameLabel.getText();
	},

	setName : function(text) {
		this.nameLabel.setText(text);
	},

	getStereoType : function(text) {
		return this.stereoTypeLabel.getText();
	},

	setStereoType : function(text) {
		this.stereoTypeLabel.setText(text);
	},

	/**
	 * @inheritdoc
	 */
	setCanvas : function(canvas) {
		this._super(canvas);
		this.setWidth(this.nameLabel.getWidth() + 30);
	},
	/**
	 * 
	 * @inheritdoc
	 */

	getPersistentAttributes : function() {
		var memento = this._super();
		$.extend(memento, {
			name : this.getName(),
			stereotype : this.getStereoType()
		});

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
	}
});

ClassFigure = draw2d.shape.layout.VerticalLayout.extend({

	NAME : "ClassFigure",

	init : function(attr, setter, getter) {
		this._super($.extend({
			resizeable : true,
			bgColor : "#ffffff",
			gap : 5,
			stroke : 1,
			color : "#000000",
			radius : 5
		}, attr), setter, getter);

		this.setUserData({
			isAddPort : false
		});

		this.stereoTypeLabel = new StereoTypeLabel();
		this.setStereoType("");

		this.nameLabel = new NameLabel();
		this.setName("class");
		this.nameLabel.setPadding(3);

		// 클래스 이름과 속성 사이 선.
		this.classNameAndAtrributeLine = new draw2d.shape.basic.Rectangle({
			stroke : 0,
			height : 1,
			minWidth : 90,
			color : "#000000"
		});
		this.classNameAndAtrributeLine.getHeight = function() {
			return 2;
		}

		// 속성값 리스트.
		this.attributeArray = new draw2d.util.ArrayList();

		// 속성과 함수 사이 선.
		this.atrributeAndMethodLine = new draw2d.shape.basic.Rectangle({
			stroke : 0,
			height : 1,
			minWidth : 90,
			color : "#000000"
		});
		this.atrributeAndMethodLine.getHeight = function() {
			return 2;
		}

		// 함수값 리스트
		this.methodArray = new draw2d.util.ArrayList();

		// 마지막으로 클래스 이름, 사이 선들, 함수, 속성 추가.
		this.add(this.nameLabel, new draw2d.layout.locator.CenterLocator(this));

		this.add(this.classNameAndAtrributeLine);

		this.addAttribute();

		this.add(this.atrributeAndMethodLine);

		this.addMethod();

		this.nameLabel.add(this.stereoTypeLabel, new draw2d.layout.locator.TopLocator());
	},

	getName : function() {
		return this.nameLabel.getText();
	},

	setName : function(text) {
		this.nameLabel.setText(text);
	},

	setAbstract : function(flag) {
		this.nameLabel.setItalic(flag);
	},

	isAbstract : function() {
		return this.nameLabel.isItalic();
	},

	getStereoType : function(text) {
		return this.stereoTypeLabel.getText();
	},

	setStereoType : function(text) {
		this.stereoTypeLabel.setText(text);
	},

	getAttributeArray : function() {
		return this.attributeArray;
	},

	getMethodArray : function() {
		return this.methodArray;
	},

	addAttribute : function() {
		var attrLabel = new ClassItemLabel();
		attrLabel.setVisibility("+");
		attrLabel.setName("attribute");
		attrLabel.setItemType("attr");

		this.attributeArray.add(attrLabel);

		this.add(attrLabel, null, this.attributeArray.getSize() + 1);

		return attrLabel;
	},

	removeAttribute : function(attr) {
		this.remove(attr);
		this.attributeArray.remove(attr);
	},

	addMethod : function() {
		var metLabel = new ClassItemLabel();
		metLabel.setVisibility("+");
		metLabel.setName("method");
		metLabel.setItemType("met");

		this.methodArray.add(metLabel);

		this.add(metLabel, null, this.attributeArray.getSize() + this.methodArray.getSize() + 3);

		return metLabel;
	},

	removeMethod : function(met) {
		this.remove(met);
		this.methodArray.remove(met);
	},

	resetAttribute : function() {
		var _this = this;
		this.getChildren().each(function(i, children) {
			if (children instanceof ClassItemLabel) {
				if (children.getItemType() === "attr") {
					_this.removeAttribute(children);
				}
			}
		});
	},

	resetMethod : function() {
		var _this = this;
		this.getChildren().each(function(i, children) {
			if (children instanceof ClassItemLabel) {
				if (children.getItemType() === "met") {
					_this.removeMethod(children);
				}
			}
		});
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
	getPersistentAttributes : function() {
		var memento = this._super();
		$.extend(memento, {
			name : this.getName(),
			isabstract : this.isAbstract(),
			stereotype : this.getStereoType()
		});

		if (this.attributeArray != null) {
			memento.attributes = [];
			this.attributeArray.each(function(i, attribute) {
				memento.attributes.push(attribute.getPersistentAttributes());
			});
		}

		if (this.methodArray != null) {
			memento.methods = [];
			this.methodArray.each(function(i, method) {
				memento.methods.push(method.getPersistentAttributes());
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

		this.setAbstract(memento.isabstract);

		if (typeof memento.stereotype !== "undefined") {
			this.setStereoType(memento.stereotype);
		}

		this.resetAttribute();

		if (typeof memento.attributes !== "undefined") {
			var _this = this;
			$.each(memento.attributes, $.proxy(function(i, e) {
				var attributeLabel = _this.addAttribute();
				attributeLabel.setPersistentAttributes(e);
			}));
		}

		this.resetMethod();

		if (typeof memento.methods !== "undefined") {
			var _this = this;
			$.each(memento.methods, $.proxy(function(i, e) {
				var methodLabel = _this.addMethod();
				methodLabel.setPersistentAttributes(e);
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
	}
});

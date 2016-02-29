/*
 현재 수정 중.
 */
SequenceFigure = draw2d.shape.composite.Jailhouse.extend({

	NAME : "SequenceFigure",
	init : function(attr, setter, getter) {
		// 감싸고 있는 도형(sequence shape)의 크기 및 색
		this._super($.extend({
			width : 100,
			height : 100,
			bgColor : "#FFFFFF",
			color : "#FFFFFF",
			opacity : 0,
			storke : 2
		}, attr), setter, getter);
		// 포트 추가할 수 없게 설정
		this.setUserData({
			isAddPort : false
		});

		this.stereoTypeLabel = new StereoTypeLabel();
		this.setStereoType("");

		// object(class) 도형 생성 및 설정
		this.nameLabel = new NameLabel({
			height : 40,
			resizeable : true,
			stroke : 2,
			bgColor : "#FFFFFF"
		});
		this.setName("sequence");
		this.nameLabel.setDraggable(false);

		this.lifeline = new SequenceLifeLineConnection();

		this.setWidth(this.nameLabel.width);

		this.add(this.stereoTypeLabel, new draw2d.layout.locator.TopLocator());

		// sequence shape의 포트 생성
		this.sequenceBoxPort = new CustomHybridPort();
	},

	getNameLabel : function() {
		return this.nameLabel;
	},

	getLifeline : function() {
		return this.lifeline;
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
	 * @method Set the new width and height of the figure and update the
	 *         constraint policy for the assigned figures..
	 * 
	 * @param {Number}
	 *            w The new width of the figure
	 * @param {Number}
	 *            h The new height of the figure
	 */
	setDimension : function(w, h) {
		this._super(w, h);
		this.policy.setBoundingBox(this.getAbsoluteBounds());
		this.assignedFigures.each(function(i, figure) {
			figure.setWidth(w);
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
			var cmd = new CommandAddPort(this, x, y, false);
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
	clone : function(x, y) {
		var clone = new Clone();
		return clone.clone(this);
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

		//this.setHeight(memento.height);

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
	 * @method Set the canvas element of this figures. This can be used to
	 *         determine whenever an element is added or removed to the canvas.
	 * 
	 * @param {draw2d.Canvas}
	 *            canvas the new parent of the figure or null
	 */
	setCanvas : function(canvas) {

		// ** node setCanvas 부분 start **
		var oldCanvas = this.canvas;

		// ** node setCanvas 부분 end **

		// ** figure setCanvas 부분 start **

		// remove the shape if we reset the canvas and the element
		// was already drawn
		if (canvas === null && this.shape !== null) {
			this.unselect();
			this.shape.remove();
			this.shape = null;

			var _this = this;

			var oldX = this.x;
			var oldY = this.y;

			this.getAssignedFigures().each(function(i, af) {
				oldCanvas.remove(af);
				_this.unassignFigure(af);
			});

			this.x = oldX;
			this.y = oldY;

			oldCanvas.remove(this.getLifeline());

			this.removePort(this.sequenceBoxPort);

			this.getNameLabel().resetPorts();

		}

		this.canvas = canvas;

		if (this.canvas !== null) {
			this.getShapeElement();

			// custom start

			this.canvas.add(this.getNameLabel(), this.x, this.y);

			// sequence shape에 object 도형을 등록
			this.assignFigure(this.getNameLabel());

			// sequence shape의 포트 추가
			this.addPort(this.sequenceBoxPort, new draw2d.layout.locator.BottomLocator());

			// sequence shape의 width 설정
			this.setWidth(this.getNameLabel().width);

			// object(class) 도형의 포트
			var nameLabelPort = this.getNameLabel().createPort("customHybrid",
					new draw2d.layout.locator.BottomLocator());

			// sequence shape의 port와 object의 port 사이 연결하여 lifeline 생성
			this.getLifeline().setRouter(new draw2d.layout.connection.DirectRouter());
			this.getLifeline().setSource(this.sequenceBoxPort);
			this.getLifeline().setTarget(nameLabelPort);

			// canvase에 lifeline에 추가
			this.canvas.add(this.getLifeline());
			// custom end
		}

		// resset the attribute cache. We must start by paint all attributes
		//
		this.lastAppliedAttributes = {};

		if (canvas === null) {
			this.stopTimer();
		} else {
			if (this.timerInterval >= this.MIN_TIMER_INTERVAL) {
				this.startTimer(this.timerInterval);
			}
		}

		this.children.each(function(i, e) {
			e.figure.setCanvas(canvas);
		});

		// ** figure setCanvas 부분 end **

		// ** node setCanvas 부분 start **

		var ports = this.getPorts();
		if (oldCanvas !== null) {
			ports.each(function(i, port) {
				oldCanvas.unregisterPort(port);
			});
		}

		if (canvas !== null) {
			ports.each(function(i, port) {
				port.setCanvas(canvas);
				canvas.registerPort(port);
			});
			// relayout the ports
			this.setDimension(this.width, this.height);
		} else {
			ports.each(function(i, port) {
				port.setCanvas(null);
			});
		}

		// ** node setCanvas 부분 end **

		// ** composite setCanvas 부분 start **

		// an composite shape goes always in the background
		//
		if (canvas !== null) {
			this.toBack();
		}

		// ** composite setCanvas 부분 end **

		// ** figure setCanvas 부분 start **

		return this;

		// ** figure setCanvas 부분 end **
	}
});

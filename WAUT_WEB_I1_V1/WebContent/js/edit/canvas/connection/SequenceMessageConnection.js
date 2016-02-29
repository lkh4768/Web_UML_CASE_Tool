SequenceMessageConnection = draw2d.Connection.extend({

	NAME : "SequenceMessageConnection",

	init : function(attr, setter, getter) {
		this._super($.extend({
			router : null,
			stroke : 2
		}, attr), setter, getter);

		// 선 설정 변경
		this.setRouter(new draw2d.layout.connection.DirectRouter());

		this.nameLabel = new NameLabel({
			text : "label"
		});
		this.stereoTypeLabel = new StereoTypeLabel();
		this.setStereoType("");
		this.guardTypeLabel = new GuardTypeLabel();
		this.setGuardType("");
		this.nameLabel.setStroke(0);
		
		this.horizon = new draw2d.shape.layout.HorizontalLayout();
		this.vertic = new draw2d.shape.layout.VerticalLayout();
		this.horizon.add(this.nameLabel);
		this.horizon.add(this.guardTypeLabel);
		this.vertic.add(this.stereoTypeLabel);
		this.vertic.add(this.horizon);
		this.add(this.vertic, new draw2d.layout.locator.ParallelMidpointLocator());

		this.setName(null);

		// 데코레이터 설정
		var deco = new draw2d.decoration.connection.ArrowDecorator();
		deco.setBackgroundColor(0, 0, 0);
		this.setTargetDecorator(deco);

		this.focBar = null;
		this.focBarHeight = null;

	},
	/**
	 * @method Set the text to show if the state shape
	 * 
	 * @param {String}
	 *            text
	 */
	setName : function(text) {
		this.nameLabel.setText(text);

		// hide the label if no text available
		this.nameLabel.setVisible(!(text === null || text === ""));
		this.fireEvent("change:label");

		return this;
	},

	/**
	 * @method Return the label of the shape
	 * 
	 */
	getName : function() {
		return this.nameLabel.getText();
	},
	
	getStereoType : function() {
		return this.stereoTypeLabel.getText();
	},

	setStereoType : function(text) {
		this.stereoTypeLabel.setText(text);
	},
	getGuardType : function(){
		return this.guardTypeLabel.getText();
	},
	setGuardType : function(text){
		this.guardTypeLabel.setText(text);
	},
	
	setCanvas : function(canvas) {
		if (this.canvas === canvas) {
			return; // nothing to do
		}

		var notiCanvas = this.canvas == null ? canvas : this.canvas;

		this._super(canvas);

		if (this.sourceDecoratorNode !== null) {
			this.sourceDecoratorNode.remove();
			this.sourceDecoratorNode = null;
		}

		if (this.targetDecoratorNode !== null) {
			this.targetDecoratorNode.remove();
			this.targetDecoratorNode = null;
		}

		if (this.canvas === null) {

			this.router.onUninstall(this);
			if (this.sourcePort !== null) {
				this.sourcePort.off(this.moveListener);
				notiCanvas.fireEvent("disconnect", {
					"port" : this.sourcePort,
					"connection" : this
				});
				this.sourcePort.onDisconnect(this);
			}
			if (this.targetPort !== null) {
				this.targetPort.off(this.moveListener);
				notiCanvas.fireEvent("disconnect", {
					"port" : this.targetPort,
					"connection" : this
				});
				this.targetPort.onDisconnect(this);

				// focBar 삭제하는 곳
				notiCanvas.remove(this.focBar);

				var oldHeight = this.targetPort.getParent().getHeight();
				this.targetPort.getParent().unassignFigure(this.focBar);
				this.targetPort.getParent().setHeight(oldHeight);

			}
		} else {
			this.router.onInstall(this);

			if (this.sourcePort !== null) {
				this.sourcePort.on("move", this.moveListener);
				this.canvas.fireEvent("connect", {
					"port" : this.sourcePort,
					"connection" : this
				});
				this.sourcePort.onConnect(this);
			}
			if (this.targetPort !== null) {
				this.targetPort.on("move", this.moveListener);
				this.canvas.fireEvent("connect", {
					"port" : this.targetPort,
					"connection" : this
				});
				this.targetPort.onConnect(this);

				// focBar 추가하는 곳
				if (this.focBar === null) {
					this.focBar = new FOCBarFigure(this.targetPort);
					if (this.focBarHeight !== null) {
						this.focBar.setHeight(this.focBarHeight);
					}
				}

				this.canvas.add(this.focBar);
				this.targetPort.getParent().assignFigure(this.focBar);
			}
		}

	},

	/**
	 * @inheritdoc
	 */
	getPersistentAttributes : function() {
		var memento = this._super();

		$.extend(memento, {
			name : this.getName(),
			stereotype : this.getStereoType(),
			guardtype : this.getGuardType(),
			focbarHeight : this.focBar.getHeight()
		});

		return memento;
	},

	/**
	 * @inheritdoc
	 */
	setPersistentAttributes : function(memento) {
		this._super(memento);
		
		if (typeof memento.focbarHeight !== "undefined") {
			this.focBarHeight = memento.focbarHeight;
		}

		if (typeof memento.name !== "undefined") {
			this.setName(memento.name);
		}
		
		if (typeof memento.name !== "undefined") {
			this.setStereoType(memento.stereotype);
		}
		
		if (typeof memento.name !== "undefined") {
			this.setGuardType(memento.guardtype);
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
		var contextMenu = new CustomContextMenu();
		contextMenu.customContextMenuForConnection(this, x, y);
	}

});

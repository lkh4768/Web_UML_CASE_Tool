DefaultConnection = draw2d.Connection.extend({

	NAME : "DefaultConnection",

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

	/**
	 * @inheritdoc
	 */
	getPersistentAttributes : function() {

		return $.extend(this._super(), {
			name : this.getName(),
			stereotype : this.getStereoType(),
			guardtype : this.getGuardType()
		});
	},

	/**
	 * @inheritdoc
	 */
	setPersistentAttributes : function(memento) {
		this._super(memento);

		// nothing to to for the connection creation. This will be done in
		// the draw2d.io.Reader
		// implementation
		//
		// restore your custom attributes here
		if (typeof memento.target.decoration !== "undefined" && memento.target.decoration != null) {
			
			//connection deco 설정
			var decoratorFactory = new DecoratorFactory();
			var decorator = decoratorFactory.createDecorator(this, memento.target.decoration);
			this.setTargetDecorator(decorator);
		}

		if (typeof memento.name !== "undefined") {
			this.setName(memento.name);
		}
		
		if (typeof memento.stereotype !== "undefined") {
			this.setStereoType(memento.stereotype);
		}
		
		if (typeof memento.guardtype !== "undefined") {
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
		var ctMenuFactory = new ContextMenuFactoryInCanvas();
		ctMenuFactory.createContextMenu(this, x, y, this.getTarget().getParent(),this.getSource().getParent());
	}

});

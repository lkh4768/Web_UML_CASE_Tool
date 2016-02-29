CompositionDecorator = draw2d.decoration.connection.DiamondDecorator.extend({

	NAME : "CompositionDecorator",

	init : function(width, height) {
		this._super(width, height);
		this.setBackgroundColor(0, 0, 0);		
	}
});

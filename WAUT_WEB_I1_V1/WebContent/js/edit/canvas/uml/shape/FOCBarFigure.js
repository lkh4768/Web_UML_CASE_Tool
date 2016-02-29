FOCBarFigure = draw2d.shape.basic.Rectangle.extend({

	NAME : "FOCBarFigure",

	init : function(targetPort, attr, setter, getter) {
		this._super($.extend({
			bgColor : "#ffffff",
			stroke : 2,
			opacity : 1
		}, attr), setter, getter);

		this.targetPort = targetPort;

		if ((this.getHeight() + this.getY()) > (this.targetPort.getParent().getHeight() + this.targetPort.getParent()
				.getY())) {
			this.setHeight(this.targetPort.getParent().getHeight() + this.targetPort.getParent().getY() - this.getY()
					- 5);
		}
	},

	getWidth : function() {
		return 9;
	},

	getX : function() {
		return (this.targetPort.getAbsoluteX() - 4.5);
	},

	getY : function() {
		return this.targetPort.getAbsoluteY();
	},
	/**
	 * @inheritdoc
	 */
	getPersistentAttributes : function() {
		return null;
	}
});
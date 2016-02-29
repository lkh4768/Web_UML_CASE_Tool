NameLabel = draw2d.shape.basic.Label.extend({
	NAME : "NameLabel",

	init : function(attr, setter, getter) {
		this._super($.extend({
			bold : true,
			fontSize : 13,
			stroke : 0
		}, attr), setter, getter);

		this.installEditor(new draw2d.ui.LabelInplaceEditor());
	},

	setItalic : function(flag) {
		if (flag)
			this.addCssClass("italiced");
		else
			this.removeCssClass("italiced");
	},

	isItalic : function() {
		return this.hasCssClass("italiced");
	},
	/**
	 * @inheritdoc
	 */
	getPersistentAttributes : function() {
		return null;
	}
});
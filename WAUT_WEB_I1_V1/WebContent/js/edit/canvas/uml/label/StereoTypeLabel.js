GuardTypeLabel = draw2d.shape.basic.Label.extend({
	NAME : "GuardTypeLabel",

	init : function(attr, setter, getter) {
		this._super($.extend({
			fontSize : 13,
			stroke : 0
		}, attr), setter, getter);

		this.installEditor(new draw2d.ui.LabelInplaceEditor());
	},

	setText : function(text) {
		if (text !== "") {
			text = ": [" + text + "]";
		}

		this._super(text);

	},

	getText : function() {
		var text = this.text.replace(": [", "");
		text = text.replace("]", "");

		return text;
	},
});
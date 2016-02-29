StateItemLabel = draw2d.shape.basic.Label.extend({
	NAME : "StateItemLabel",

	init : function(attr, setter, getter) {
		this._super($.extend({
			fontSize : 13,
			stroke : 0,
			padding : 3
		}, attr), setter, getter);

		this.installEditor(new draw2d.ui.LabelInplaceEditor());
	},

	getActivity : function() {
		var textItems = this.text.split("/");
		return textItems[0];
	},

	setActivity : function(activity) {
		var text = activity + "/" + this.getName();

		this.setText(text);
	},
	

	setName : function(text) { 
		text = this.getActivity() + "/" + text;

		this.setText(text);
	},
	
	getName : function() {
		var textItems = this.text.split("/");

		return textItems[1];
	},
	
	setText : function(text) {
		var textItem = text.split("/");

		if (textItem[1] == null) {
			text = "action/" + text;
		}
		
		this._super(text);
	}
});
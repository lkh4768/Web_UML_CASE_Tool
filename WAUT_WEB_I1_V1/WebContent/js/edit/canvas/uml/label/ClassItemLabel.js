ClassItemLabel = draw2d.shape.basic.Label.extend({
	NAME : "ClassItemLabel",

	init : function(attr, setter, getter) {
		this._super($.extend({
			fontSize : 13,
			stroke : 0,
			padding : 3
		}, attr), setter, getter);

		this.installEditor(new draw2d.ui.LabelInplaceEditor());

		this.itemType = null;
	},

	getVisibility : function() {
		var textItems = this.text.split(" ");
		return textItems[0];
	},

	setVisibility : function(visibility) {
		var text = visibility + " " + this.getName();

		this.setText(text);
	},

	setName : function(text) {
		text = this.getVisibility() + " " + text;

		this.setText(text);
	},

	getName : function() {
		var textItems = this.text.split(" ");

		return textItems[1];
	},

	setText : function(text) {
		var textItem = text.split(" ");

		if (textItem[1] == null) {
			text = "+ " + text;
		}

		this._super(text);
	},

	getText : function() {
		return this.getName();
	},

	setStatic : function(flag) {
		if (flag)
			this.addCssClass("underlined");
		else
			this.removeCssClass("underlined");
	},

	isStatic : function() {
		return this.hasCssClass("underlined");
	},

	setAbstract : function(flag) {
		if (flag)
			this.addCssClass("italiced");
		else
			this.removeCssClass("italiced");
	},

	isAbstract : function() {
		return this.hasCssClass("italiced");
	},

	setItemType : function(itemType) {
		this.itemType = itemType;
	},

	getItemType : function() {
		return this.itemType;
	},

	/**
	 * @inheritdoc
	 */
	getPersistentAttributes : function() {
		var memento = this._super();
		$.extend(memento, {
			itemtype : this.getItemType()
		});

		return memento;
	},

	/**
	 * @inheritdoc
	 */
	setPersistentAttributes : function(memento) {
		this._super(memento);

		this.setItemType(memento.itemtype);
	}
});
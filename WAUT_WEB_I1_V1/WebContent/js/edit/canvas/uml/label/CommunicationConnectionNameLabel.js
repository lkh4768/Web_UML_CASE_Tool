CommunicationConnectionNameLabel = draw2d.shape.basic.Label.extend({
	NAME : "CommunicationConnectionNameLabel",

	init : function(attr, setter, getter) {
		this._super($.extend({
			fontSize : 13,
			stroke : 0
		}, attr), setter, getter);

		this.installEditor(new draw2d.ui.LabelInplaceEditor());

		this.index = null;
	},

	setIndex : function(index) {
		this.index = index;
		var text = this.index + ":" + this.getText();

		this.text = text;
	},

	getIndex : function() {
		return this.index;
	},

	getText : function() {
		var text = this.text.split(":");

		return text[1];
	},

	setText : function(name) {
		this._super(this.index + ":" + name);
	},

	/**
	 * @inheritdoc
	 */
	getPersistentAttributes : function() {
		var memento = this._super();
		$.extend(memento, {
			index : this.index,
			text : this.getText()
		});

		return memento;
	},

	/**
	 * @inheritdoc
	 */
	setPersistentAttributes : function(memento) {
		this._super(memento);

		this.setIndex(memento.index);
		this.setIndex(memento.text);
	}
});
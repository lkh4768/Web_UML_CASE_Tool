SequenceLifeLineConnection = draw2d.Connection.extend({

	NAME : "SequenceMessageConnection",

	init : function(attr, setter, getter) {
		this._super($.extend({
			stroke : 2,
			"dasharray" : "- "
		}, attr), setter, getter);

		// 선 설정 변경
		this.setRouter(new draw2d.layout.connection.DirectRouter());
	},
	/**
	 * @inheritdoc
	 */
	getPersistentAttributes : function() {
		return null;
	}

});

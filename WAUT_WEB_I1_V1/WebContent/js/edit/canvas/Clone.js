/**
 * Created by wes on 15. 10. 10.
 */
Clone = Class.extend({

	init : function() {
	},

	/**
	 * @method
	 * 
	 * @param {Figure}
	 *            figure clone 할 대상 figure
	 * @param {Locator}
	 *            Childrenlocatior대상 figure의 자식 figure의 위치
	 * @since 15.10.10
	 */
	clone : function(figure) {
		var clone = eval("new " + figure.NAME + "();");
		var initialId = clone.id;
		
		clone.setPersistentAttributes(figure.getPersistentAttributes());
		
		clone.id = initialId;

		return clone;
	}
});
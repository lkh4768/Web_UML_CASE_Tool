ConnectionPropertiesViewDefault = Class.extend({
	NAME : "ConnectionPropertiesViewDefault",
	init : function(figure) {
		// selected figure
		this.figure = figure;
	},

	getPropertyView : function() {
		var view = $('<div id="ConnectionPropertiesViewDefault-container" class="row"></div>');
		var diaPropViewItems = new PropertiesViewItems(this.figure);
		
		var nameFromGroup = diaPropViewItems.getNameFromGroup();
		var stereoTypeFromGroup = diaPropViewItems.getStereoTypeFromGroup();
		var guardTypeFromGroup = diaPropViewItems.getGuardTypeFromGroup();
		
		view.append(nameFromGroup);
		view.append(stereoTypeFromGroup);
		view.append(guardTypeFromGroup);

		return view;
	},

	/**
	 * @method called by the framework if the pane has been resized. This is a
	 *         good moment to adjust the layout if required.
	 * 
	 */
	onResize : function() {
	},

	/**
	 * @method called by the framework before the pane will be removed from the
	 *         DOM tree
	 * 
	 */
	onHide : function() {
	}
});

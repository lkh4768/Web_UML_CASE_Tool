/**
 * Created by User on 2015-10-06.
 */
CustomHybridPort = draw2d.HybridPort.extend({
	NAME : "CustomHybridPort",

	/**
	 * @constructor Create a new CustomHybridPort element
	 * 
	 * @param {Object}
	 *            [attr] the configuration of the shape
	 */
	init : function(attr, setter, getter) {
		this._super(attr, setter, getter);
		// responsive for the arrangement of the port
		// calculates the x/y coordinates in relation to the parent node
		this.locator = new draw2d.layout.locator.InputPortLocator();
	},
	/**
	 * @method called by the framework if the figure should show the
	 *         contextmenu.</br> The strategy to show the context menu depends
	 *         on the plattform. Either loooong press or right click with the
	 *         mouse.
	 * 
	 * @param {Number}
	 *            x the x-coordinate to show the menu
	 * @param {Number}
	 *            y the y-coordinate to show the menu
	 * @since 1.1.0
	 */
	onContextMenu : function(x, y) {
		var ctMenuFactory = new ContextMenuFactoryInCanvas();
		ctMenuFactory.createContextMenu(this, x, y);
	},

	getParent : function() {
		return this.parent;
	}
});
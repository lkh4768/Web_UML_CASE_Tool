CommandDelPort = draw2d.command.Command.extend({

	NAME : "CommandDelPort",

	/**
	 * @constructor Create a new Command objects which can be execute via the
	 *              CommandStack.
	 * 
	 * @param {String}
	 *            label
	 */
	init : function(figure, port, x, y) {
		this._super("del port shape");
		this.figure = figure;
		this.port = port;
		this.x = x;
		this.y = y;
	},

	/**
	 * @method Returns [true] if the command can be execute and the execution of
	 *         the command modifies the model. e.g.: a CommandMove with
	 *         [startX,startX] == [endX,endY] should return false. The execution
	 *         of this Command doesn't modify the model.
	 * 
	 * @return {boolean} return try if the command modify the model or make any
	 *         relevant changes
	 */
	canExecute : function() {
		return true;
	},

	/**
	 * @method Execute the command the first time. Sup-classes must implement
	 *         this method.
	 * 
	 * @template
	 */
	execute : function() {
		this.redo();
	},

	/**
	 * @method Will be called if the user cancel the operation.
	 * 
	 * @template
	 */
	cancel : function() {
	},

	/**
	 * @method Undo the command. Sup-classes must implement this method.
	 * 
	 * @template
	 */
	undo : function() {
		var targetX = this.x - this.figure.getX();
		var targetY = this.y - this.figure.getY();

		if (targetY < (this.figure.getHeight()) / 2) {
			if (targetX < (this.figure.getWidth()) / 2) {
				if (targetX > targetY)
					targetY = 0;
				else
					targetX = 0;
			} else {
				if (targetX - ((this.figure.getWidth()) / 2) > ((this.figure.getHeight()) / 2) - targetY)
					targetX = this.figure.getWidth();
				else
					targetY = 0;
			}
		} else {
			if (targetX < ((this.figure.getWidth()) / 2)) {
				if (((this.figure.getWidth()) / 2) - targetX > targetY - ((this.figure.getHeight()) / 2))
					targetX = 0;
				else
					targetY = this.figure.getHeight();
			} else {
				if (targetX > targetY) {
					targetX = this.figure.getWidth();
				} else
					targetY = this.figure.getHeight();
			}
		}

		targetX = targetX / this.figure.getWidth() * 100;
		targetY = targetY / this.figure.getHeight() * 100;

		this.port = this.figure
				.createPort("customHybrid", new draw2d.layout.locator.XYRelPortLocator(targetX, targetY));

		this.figure.setUserData({
			isAddPort : false
		});
	},

	/**
	 * @method Redo the command after the user has undo this command.
	 *         Sup-classes must implement this method.
	 * 
	 * @template
	 */
	redo : function() {
		this.figure.removePort(this.port);
	}
});
CommandCopyFigure = draw2d.command.Command.extend({

	NAME : "CommandCopyFigure",

	/**
	 * @constructor Create a new Command objects which can be execute via the
	 *              CommandStack.
	 * 
	 * @param {String}
	 *            label
	 */
	init : function(canvas, figure) {
		this._super("copy shape");
		this.canvas = canvas;
		this.targetFigure = figure;
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
		return this.targetFigure != null;
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
		this.canvas.setClipboardFigure(null);
	},

	/**
	 * @method Redo the command after the user has undo this command.
	 *         Sup-classes must implement this method.
	 * 
	 * @template
	 */
	redo : function() {
		this.canvas.setClipboardFigure(this.targetFigure);
	}
});

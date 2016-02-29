CommandPasteFigure = draw2d.command.Command.extend({

	NAME : "CommandPasteFigure",

	/**
	 * @constructor Create a new Command objects which can be execute via the
	 *              CommandStack.
	 * 
	 * @param {String}
	 *            label
	 */
	init : function(canvas, figure, x, y) {
		this._super("paste shape");
		this.canvas = canvas;
		this.targetFigure = figure.clone();
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
		this.canvas.remove(this.targetFigure);
		this.canvas.setClipboardFigure(this.targetFigure);
	},

	/**
	 * @method Redo the command after the user has undo this command.
	 *         Sup-classes must implement this method.
	 * 
	 * @template
	 */
	redo : function() {
		this.canvas.add(this.targetFigure, this.x, this.y);
		if (this.targetFigure instanceof SequenceFigure) {
			// sequence shape에 object 도형을 등록
			this.targetFigure.assignFigure(this.targetFigure.getNameLabel());
		}
	}
});

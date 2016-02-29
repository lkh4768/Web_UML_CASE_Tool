CommandChangeDecorator = draw2d.command.Command.extend({

	NAME : "CommandChangeDecorator",

	/**
	 * @constructor Create a new Command objects which can be execute via the
	 *              CommandStack.
	 * 
	 * @param {String}
	 *            label
	 */
	init : function(connection, decoratorName) {
		this._super("change decorator");
		this.connection = connection;
		this.decoratorName = decoratorName;
		this.currentDecoratorName = null;
		console.log(connection.getTargetDecorator());
		if(connection.getTargetDecorator() !== null)
			this.currentDecoratorName = connection.getTargetDecorator().NAME;
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
		var decoratorFactory = new DecoratorFactory();
		var decorator = decoratorFactory.createDecorator(this.connection, this.currentDecoratorName);
		
		this.connection.setTargetDecorator(decorator);
	},

	/**
	 * @method Redo the command after the user has undo this command.
	 *         Sup-classes must implement this method.
	 * 
	 * @template
	 */
	redo : function() {
		var decoratorFactory = new DecoratorFactory();
		var decorator = decoratorFactory.createDecorator(this.connection, this.decoratorName);
		
		this.connection.setTargetDecorator(decorator);
	}
});
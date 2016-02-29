EditorCanvas = draw2d.Canvas.extend({

	init : function(id) {
		this._super(id);

		this.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());
		this.installEditPolicy(new draw2d.policy.canvas.SnapToInBetweenEditPolicy({
			lineColor : "#ff0000"
		}));
		this.installEditPolicy(new draw2d.policy.canvas.SnapToCenterEditPolicy({
			lineColor : "#ff0000"
		}));
		this.installEditPolicy(new draw2d.policy.canvas.SnapToGeometryEditPolicy({
			lineColor : "#ff0000"
		}));
		this.installEditPolicy(new draw2d.policy.canvas.KeyboardPolicy());
		this.installEditPolicy(new draw2d.policy.canvas.ShowGridEditPolicy());
		this.currentDropConnection = null;

		// override the defualt keyUp method to avoid "delete" of elements via
		// ENTF key
		this.onKeyDown = function() {
		};

		this.clipboardFigure = null;

		this.communicationConnectionLabelList = new draw2d.util.ArrayList();
	},

	getClipboardFigure : function() {
		return this.clipboardFigure;
	},

	setClipboardFigure : function(figure) {
		this.clipboardFigure = figure;
	},

	getCommunicationConnectionLabelList : function() {
		return this.communicationConnectionLabelList;
	},

	addCommunicationConnectionLabel : function(label) {
		this.communicationConnectionLabelList.add(label);
	},

	removeCommunicationConnectionLabel : function(label) {
		this.communicationConnectionLabelList.remove(label);
	},

	getCommunicationConnectionLabelListLastIndex : function() {
		return this.communicationConnectionLabelList.getSize();
	},

	updateCommunicationConnectionLabelList : function() {
		this.communicationConnectionLabelList.each(function(i, label) {
			label.setIndex(i);
		});
	},

	/**
	 * @method Reset the canvas and delete all model elements.<br>
	 *         You can now reload another model to the canvas with a
	 *         {@link draw2d.io.Reader}
	 * 
	 * @since 1.1.0
	 */
	clear : function() {
		var clear = this._super();

		// clipboard 초기화
		this.clipboardFigure = null;

		return clear;
	},

	onRightMouseDown : function(x, y, shiftKey, ctrlKey) {
		this.fireEvent("contextmenu", {
			x : x,
			y : y,
			shiftKey : shiftKey,
			ctrlKey : ctrlKey
		});

		var figure = this.getBestFigure(x, y);
		if (figure !== null) {
			figure.fireEvent("contextmenu", {
				x : x,
				y : y
			});
			figure.onContextMenu(x, y);

			// forward the event to all installed policies of the figure
			// soft migration from onHookXYZ to Policies.
			// since 4.4.0
			figure.editPolicy.each(function(i, policy) {
				policy.onRightMouseDown(figure, x, y, shiftKey, ctrlKey);
			});
		} else {
			var ctMenuFactory = new ContextMenuFactoryInCanvas();
			ctMenuFactory.createContextMenu(this, x, y);
		}

		// forward the event to all install policies as well.
		// (since 4.4.0)
		this.editPolicy.each(function(i, policy) {
			policy.onRightMouseDown(figure, x, y, shiftKey, ctrlKey);
		});
	},

	/**
	 * @method Called if the DragDrop object is moving around.<br>
	 *         <br>
	 *         Graphiti use the jQuery draggable/droppable lib. Please inspect
	 *         http://jqueryui.com/demos/droppable/ for further information.
	 * 
	 * @param {HTMLElement}
	 *            droppedDomNode The dragged DOM element.
	 * @param {Number}
	 *            x the x coordinate of the drag
	 * @param {Number}
	 *            y the y coordinate of the drag
	 * 
	 * @template
	 */
	onDrag : function(droppedDomNode, x, y) {
	},

	/**
	 * @method Called if the user drop the droppedDomNode onto the canvas.<br>
	 *         <br>
	 *         Draw2D use the jQuery draggable/droppable lib. Please inspect
	 *         http://jqueryui.com/demos/droppable/ for further information.
	 * 
	 * @param {HTMLElement}
	 *            droppedDomNode The dropped DOM element.
	 * @param {Number}
	 *            x the x coordinate of the drop
	 * @param {Number}
	 *            y the y coordinate of the drop
	 * @param {Boolean}
	 *            shiftKey true if the shift key has been pressed during this
	 *            event
	 * @param {Boolean}
	 *            ctrlKey true if the ctrl key has been pressed during the event
	 * @private
	 */
	onDrop : function(droppedDomNode, x, y, shiftKey, ctrlKey) {
		var type = $(droppedDomNode).data("shape");
		var figure = eval("new " + type + "();");
		// create a command for the undo/redo support
		var command = new draw2d.command.CommandAdd(this, figure, x, y);
		this.getCommandStack().execute(command);
	}
});

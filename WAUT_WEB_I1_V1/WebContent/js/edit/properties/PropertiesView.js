PropertiesView = Class.extend({
	NAME : "PropertiesView",
	init : function(elementId, canvasView) {
		this.selectedFigure = null;
		this.html = $("#" + elementId);
		this.canvas = canvasView.getCanvas();
		this.view = null;
		
		this.canvas.on("select", $.proxy(this.onSelectionChanged, this));

		// register as listener to update the property pane if anything has been
		// changed in the model
		//
		this.canvas.getCommandStack().addEventListener($.proxy(function(event) {
			if (event.isPostChangeEvent()) {
				this.onSelectionChanged(this, this.selectedFigure);
			}
		}, this));
	},

	/**
	 * @method Called if the selection in the canvas has been changed. You must
	 *         register this class on the canvas to receive this event.
	 * 
	 * @param {draw2d.Figure}
	 *            figure
	 */
	onSelectionChanged : function(emitter, figure) {
		this.selectedFigure = figure;

		if (this.view !== null) {
			this.view.onHide();
		}

		this.html.html("");

		if (figure === null) {
			return;
		}
		this.view = null;
		switch (figure.NAME) {
		case "ActorFigure":
		case "UseCaseFigure":
			this.view = new DiagramPropertiesViewActorAndUseCase(figure);
			break;
		case "SequenceFigure":
		case "PackageFigure":
		case "SystemFigure":
			this.view = new DiagramPropertiesViewPackageAndSystemAndSeq(figure);
			break;
		case "ClassFigure":
			this.view = new DiagramPropertiesViewClass(figure);
			break;
		case "ActivityFigure":
			this.view = new DiagramPropertiesViewActivity(figure);
			break;
		case "StateFigure":
			this.view = new DiagramPropertiesViewState(figure);
			break;
		case "VerticalSwimlaneFigure":
			this.view = new DiagramPropertiesViewVerticalSwimlane(figure);
			break;
		case "CommunicationFigure":
			this.view = new DiagramPropertiesViewCommunicationFigure(figure);
			break;
		case "DefaultConnection":
		case "SequenceMessageConnection":
		case "CommunicationConnection":
			this.view = new ConnectionPropertiesViewDefault(figure);
			break;
		default:
			break;
		}

		if (this.view !== null) {
			this.html.append(this.view.getPropertyView());
		}
	},

	onResize : function() {
		if (this.view !== null) {
			this.view.onResize();
		}
	}

});

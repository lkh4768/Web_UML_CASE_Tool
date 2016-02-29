DropBoxContextFactoryInCanvas = Class.extend({

	NAME : "DropBoxContextFactoryInCanvas",

	init : function() {
	},

	createDropBoxContext : function(targetFigure, sourceFigure) {
		var dropBoxContext = new DropBoxContextItemsInCanvas();

		if (sourceFigure instanceof PackageFigure) {
			dropBoxContext.addLiTag(dropBoxContext.getDependencyDecoratorLiTag());
		} else if (sourceFigure instanceof SystemFigure) {
			dropBoxContext.addLiTag(dropBoxContext.getDependencyDecoratorLiTag());
		} else if (sourceFigure instanceof UseCaseFigure) {

			if (targetFigure instanceof UseCaseFigure) {
				dropBoxContext.addLiTag(dropBoxContext.getAssociationDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getDirectedAssociationDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getGeneralisationDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getDependencyDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getIncludeDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getExtendDecoratorLiTag());
			}

			else if (targetFigure instanceof ActorFigure) {
				dropBoxContext.addLiTag(dropBoxContext.getAssociationDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getDirectedAssociationDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getGeneralisationDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getDependencyDecoratorLiTag());
			}

			else {
				dropBoxContext.addLiTag(dropBoxContext.getDependencyDecoratorLiTag());
			}
		} else if (sourceFigure instanceof ActorFigure) {
			if ((targetFigure instanceof ActorFigure) || (targetFigure instanceof UseCaseFigure)) {
				dropBoxContext.addLiTag(dropBoxContext.getAssociationDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getDirectedAssociationDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getGeneralisationDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getDependencyDecoratorLiTag());
			} else {
				dropBoxContext.addLiTag(dropBoxContext.getDependencyDecoratorLiTag());
			}
		} else if (sourceFigure instanceof ClassFigure) {
			if ((targetFigure instanceof ClassFigure)) {
				dropBoxContext.addLiTag(dropBoxContext.getAssociationDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getDirectedAssociationDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getAggregationDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getCompositionDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getGeneralisationDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getDependencyDecoratorLiTag());
			} else {
				dropBoxContext.addLiTag(dropBoxContext.getDependencyDecoratorLiTag());
			}
		} else if (sourceFigure instanceof SequenceFigure) {
			if ((targetFigure instanceof SequenceFigure)) {
				dropBoxContext.addLiTag(dropBoxContext.getSequenceMessageDecoratorLiTag());
				dropBoxContext.addLiTag(dropBoxContext.getReplyMessageDecoratorLiTag());
			} else {
				dropBoxContext.addLiTag(dropBoxContext.getDependencyDecoratorLiTag());
			}
		} else if (targetFigure instanceof FinalFigure) {
			dropBoxContext.addLiTag(dropBoxContext.getArrowConnectionDecoratorLiTag());
		} else if (targetFigure instanceof InitialFigure) {
			dropBoxContext.addLiTag(dropBoxContext.getArrowConnectionDecoratorLiTag());
		} else if (targetFigure instanceof ChoiceFigure) {
			dropBoxContext.addLiTag(dropBoxContext.getArrowConnectionDecoratorLiTag());
		} else if (targetFigure instanceof HorizontalBarFigure) {
			dropBoxContext.addLiTag(dropBoxContext.getArrowConnectionDecoratorLiTag());
		} else if (targetFigure instanceof VerticalBarFigure) {
			dropBoxContext.addLiTag(dropBoxContext.getArrowConnectionDecoratorLiTag());
		} else if (targetFigure instanceof StateFigure) {
			dropBoxContext.addLiTag(dropBoxContext.getArrowConnectionDecoratorLiTag());
		} else if (targetFigure instanceof ActivityFigure) {
			dropBoxContext.addLiTag(dropBoxContext.getArrowConnectionDecoratorLiTag());
		} else if (targetFigure instanceof CommunicationFigure) {
			dropBoxContext.addLiTag(dropBoxContext.getCommunicationConnectionDecoratorLiTag());
		}

		return dropBoxContext.getContext();
	}
});
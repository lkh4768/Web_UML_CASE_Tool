/**
 * Created by wes on 15. 11. 10.
 */
ContextMenuFactoryInCanvas = Class.extend({
	NAME : "ContextMenuFactoryInCanvas",

	init : function() {

	},

	createContextMenu : function(target, x, y, targetFigure, sourceFigure) {
		var contextMenuItems = new ContextMenuItemsInCanvas(target, x, y);

		if (target instanceof EditorCanvas) {
			contextMenuItems.appendItem(contextMenuItems.getPasteItem());
			contextMenuItems.appendItem(contextMenuItems.getSepItem());
			contextMenuItems.appendItem(contextMenuItems.getUndoItem());
			contextMenuItems.appendItem(contextMenuItems.getRedoItem());
		} else if (target instanceof draw2d.Connection) {

			if (target instanceof DefaultConnection) {

				if (sourceFigure instanceof UseCaseFigure) {
					if (targetFigure instanceof UseCaseFigure) {
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getAssociationDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getDirectedAssociationDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getGeneralisationDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getDependencyDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getIncludeDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getExtendDecoItem());
						// 마지막에 서브메뉴의 부모메뉴를 append해줘야지 완성됨.
						contextMenuItems.appendItem(contextMenuItems.getConnectionChangeItem());
					}

					else if (targetFigure instanceof ActorFigure) {
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getAssociationDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getDirectedAssociationDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getGeneralisationDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getDependencyDecoItem());
						// 마지막에 서브메뉴의 부모메뉴를 append해줘야지 완성됨.
						contextMenuItems.appendItem(contextMenuItems.getConnectionChangeItem());
					}
				} else if (sourceFigure instanceof ActorFigure) {
					if ((targetFigure instanceof ActorFigure) || (targetFigure instanceof UseCaseFigure)) {
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getAssociationDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getDirectedAssociationDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getGeneralisationDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getDependencyDecoItem());
						// 마지막에 서브메뉴의 부모메뉴를 append해줘야지 완성됨.
						contextMenuItems.appendItem(contextMenuItems.getConnectionChangeItem());
					}
				} else if (sourceFigure instanceof ClassFigure) {
					if (targetFigure instanceof ClassFigure) {
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getAssociationDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getDirectedAssociationDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getGeneralisationDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getDependencyDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getAggregationDecoItem());
						contextMenuItems.appendSubItem(contextMenuItems.getConnectionChangeItem(), contextMenuItems
								.getCompositionDecoItem());
						// 마지막에 서브메뉴의 부모메뉴를 append해줘야지 완성됨.
						contextMenuItems.appendItem(contextMenuItems.getConnectionChangeItem());
					}
				}

			}
			contextMenuItems.appendItem(contextMenuItems.getDeleteItem());

		} else if (target instanceof draw2d.Port) {
			contextMenuItems.appendItem(contextMenuItems.getDeletePortItem());
		} else {
			if (target instanceof VerticalSwimlaneFigure) {
				contextMenuItems.appendItem(contextMenuItems.getCutItem());
				contextMenuItems.appendItem(contextMenuItems.getCopyItem());
				contextMenuItems.appendItem(contextMenuItems.getSepItem());
				contextMenuItems.appendItem(contextMenuItems.getToFrontItem());
				contextMenuItems.appendItem(contextMenuItems.getToBackItem());
				contextMenuItems.appendItem(contextMenuItems.getSepItem());
				contextMenuItems.appendItem(contextMenuItems.getDeleteItem());
			} else {
				contextMenuItems.appendItem(contextMenuItems.getAddPortItem());
				contextMenuItems.appendItem(contextMenuItems.getSepItem());
				contextMenuItems.appendItem(contextMenuItems.getCutItem());
				contextMenuItems.appendItem(contextMenuItems.getCopyItem());
				contextMenuItems.appendItem(contextMenuItems.getSepItem());
				contextMenuItems.appendItem(contextMenuItems.getToFrontItem());
				contextMenuItems.appendItem(contextMenuItems.getToBackItem());
				contextMenuItems.appendItem(contextMenuItems.getSepItem());
				contextMenuItems.appendItem(contextMenuItems.getDeleteItem());
			}

		}

		return contextMenuItems.getContextMenu();
	}
});

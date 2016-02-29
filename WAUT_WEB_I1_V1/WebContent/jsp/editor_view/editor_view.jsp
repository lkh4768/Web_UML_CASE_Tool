<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>
<!-- DRAW2D JAVASCRIPT(REQUIRED CANVAS) -->
<script src="${pageContext.request.contextPath}/lib/js/shifty.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/raphael.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/rgbcolor.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/canvg.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/pathfinding-browser.min.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/StackBlur.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/draw2d.js"></script>

<!-- CANVAS VIEW JAVASCRIPT(REQUIRED CANVAS VIEW) -->
<script src="${pageContext.request.contextPath}/js/edit/canvasView/CanvasView.js"></script>

<!-- DRAW2D CUSTOM JAVASCRIPT (REQUIRED CANVAS VIEW) -->
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/label/NameLabel.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/label/StereoTypeLabel.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/label/ClassItemLabel.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/label/StateItemLabel.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/label/CommunicationConnectionNameLabel.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/label/GuardTypeLabel.js"></script>

<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/ActorFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/SequenceFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/PackageFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/ClassFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/ActivityFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/ChoiceFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/CommunicationFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/FinalFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/HorizontalBarFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/InitialFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/StateFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/VerticalBarFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/UseCaseFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/SystemFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/VerticalSwimlaneFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/uml/shape/FOCBarFigure.js"></script>

<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/DefaultConnection.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/SequenceMessageConnection.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/ConnectionFactory.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/CommunicationConnection.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/SequenceLifeLineConnection.js"></script>

<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/decoration/DecoratorFactory.js"></script>

<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/decoration/AggregationDecorator.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/decoration/HalfArrowDecorator.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/decoration/CompositionDecorator.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/decoration/DependencyDecorator.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/decoration/DirectedAssociationDecorator.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/decoration/GeneralisationDecorator.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/decoration/RealisationDecorator.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/decoration/IncludeDecorator.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/decoration/ExtendDecorator.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/connection/decoration/MessageDecorator.js"></script>

<script src="${pageContext.request.contextPath}/js/edit/canvas/command/CommandChangeDecorator.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/command/CommandAddPort.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/command/CommandDelPort.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/command/CommandCopyFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/command/CommandCutFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/canvas/command/CommandPasteFigure.js"></script>

<SCRIPT src="${pageContext.request.contextPath}/js/edit/canvas/CustomHybridPort.js"></SCRIPT>
<script src="${pageContext.request.contextPath}/js/edit/canvas/Clone.js"></script>

<script src="${pageContext.request.contextPath}/js/edit/contextMenu/dropBoxContextMenu/DropBoxContextFactoryInCanvas.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/contextMenu/dropBoxContextMenu/DropBoxContextItemsInCanvas.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/contextMenu/dropBoxContextMenu/DropBoxContextMenuInCanvas.js"></script>

<script src="${pageContext.request.contextPath}/js/edit/contextMenu/defaultContextMenu/ContextMenuItemsInCanvas.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/contextMenu/defaultContextMenu/ContextMenuFactoryInCanvas.js"></script>

<script src="${pageContext.request.contextPath}/js/edit/canvas/EditorCanvas.js"></script>

<script src="${pageContext.request.contextPath}/js/edit/io/JSONWriter.js"></script>

<!-- TOOLBAR JAVASCRIPT(REQUIRED EDITOR VIEW) -->
<script src="${pageContext.request.contextPath}/js/edit/toolbarView/ToolbarView.js"></script>

<!-- DIAGRAM JAVASCRIPT(REQUIRED DIAGRAM VIEW) -->
<script src="${pageContext.request.contextPath}/js/edit/diagramView/DiagramView.js"></script>

<!-- FILE LOG AND COMMNET JAVASCRIPT(REQUIRED DIAGRAM FILE LOG AND COMMNET VIEW) -->
<script src="${pageContext.request.contextPath}/js/edit/fileLogAndCommentView/FileLogAndCommentView.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/fileLogAndCommentView/logView/LogView.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/fileLogAndCommentView/logView/LogEntity.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/fileLogAndCommentView/commentView/CommentView.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/fileLogAndCommentView/commentView/CommentEntity.js"></script>

<!-- PROPERTIES JAVASCRIPT(REQUIRED PROPERTIES VIEW) -->
<script src="${pageContext.request.contextPath}/js/edit/properties/PropertiesView.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/properties/PropertiesViewItems.js"></script>

<script src="${pageContext.request.contextPath}/js/edit/properties/DiagramPropertiesViewActorAndUseCase.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/properties/DiagramPropertiesViewPackageAndSystemAndSeq.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/properties/DiagramPropertiesViewClass.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/properties/DiagramPropertiesViewActivty.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/properties/DiagramPropertiesViewVerticalSwimlane.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/properties/DiagramPropertiesViewState.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/properties/DiagramPropertiesViewCommunicationFigure.js"></script>
<script src="${pageContext.request.contextPath}/js/edit/properties/ConnectionPropertiesViewDefault.js"></script>

<script type="text/javascript">
	$(window)
			.load(
					function() {
						var canvasView = new CanvasView("canvas-container", "${pageContext.request.contextPath}");

						if ("${fileParentID}" == "") {
							canvasView.addCanvasInfo(null, "${fileName}", null, null, null, null, null, null,
									'${fileContent}');
						} else {
							canvasView.addCanvasInfo("${fileID}", "${fileName}", "${fileOwnerID}", "${fileOwnerName}",
									"${fileModifierID}", "${fileModifierName}", "${fileSharedRootID}",
									"${fileParentID}", '${fileContent}');
						}

						//툴바 설정
						var toolbar = new ToolbarView(canvasView, "${pageContext.request.contextPath}");

						//다이어그램 뷰 설정
						var diagramView = new DiagramView();

						//uml 속성 뷰 설정
						var propertiesView = new PropertiesView("properties-content", canvasView);
					});
</script>

<div id="toolbar-container" class="row">
	<!-- toolbar -->
	<jsp:include page="editor_toolbar_view.jsp" flush="false" />
</div>

<div id="diagram-container" class="row">
	<!-- right sidebar -->
	<div id="diagram-sidebar" class="col-xs-12 col-md-2 fill-height no-padding">
		<jsp:include page="diagram_view.jsp" flush="false" />
	</div>

	<!-- canvas -->
	<div id="canvas-container" class="col-xs-12 col-md-8 fill-height no-padding">
		<div>
			<jsp:include page="editor_canvas_view.jsp" flush="false" />
		</div>
	</div>

	<!-- left sidebar -->
	<div id="log-and-properties-sidebar" class="col-xs-12 col-md-2 sidebar fill-height no-padding">
		<!-- left - top -->
		<div class="row-xs-6">
			<jsp:include page="file_log_and_comment_view.jsp" flush="false" />
		</div>

		<!-- left - bottom -->
		<div class="row-xs-6">
			<jsp:include page="properties_view.jsp" flush="false" />
		</div>
	</div>
</div>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>

<div id="diagram-sidebar-nav">
	<div class="panel-group diagram-panel-group">
		<!-- use case dia sidebar -->
		<div class="panel diagram-panel">
			<div class="panel-heading">
				<a data-toggle="collapse" class="diagram-item-title-collapse collapsed" href="#use-case-dia-collapse">
					<div class="row diagram-item-title-row">
						<div class="col-md-10 col-xs-10 diagram-item-title-center">Use Case Diagram</div>
						<div class="col-md-2 col-xs-2 diagram-item-title-right">
							<img class="diagram-item-title-right-img" src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/arrow.png" />
						</div>
					</div>
				</a>
			</div>
			<div id="use-case-dia-collapse" class="panel-collapse collapse diagram-item-collapse">
				<div class="panel-body diagram-item-panel-body">
					<div class="row">
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/actor.png" data-shape="ActorFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Actor" />
						</div>
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/usecase.png" data-shape="UseCaseFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="UseCase" />
						</div>
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/system.png" data-shape="SystemFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="System" />
						</div>
					</div>
					<div class="row">
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/package.png" data-shape="PackageFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Package" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Communicationy dia sidebar -->
		<div class="panel diagram-panel">
			<div class="panel-heading">
				<a data-toggle="collapse" class="diagram-item-title-collapse collapsed" href="#communication-dia-collapse">
					<div class="row diagram-item-title-row">
						<div class="col-md-10 col-xs-10 diagram-item-title-center">Communication Diagram</div>
						<div class="col-md-2 col-xs-2 diagram-item-title-right">
							<img class="diagram-item-title-right-img" src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/arrow.png" />
						</div>
					</div>
				</a>
			</div>
			<div id="communication-dia-collapse" class="panel-collapse collapse diagram-item-collapse">
				<div class="panel-body diagram-item-panel-body">
					<div class="row">
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/communication_object.png" data-shape="CommunicationFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Communication Lifeline" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Activity dia sidebar -->
		<div class="panel diagram-panel">
			<div class="panel-heading">
				<a data-toggle="collapse" class="diagram-item-title-collapse collapsed" href="#activity-dia-collapse">
					<div class="row diagram-item-title-row">
						<div class="col-md-10 col-xs-10 diagram-item-title-center">Activity Diagram</div>
						<div class="col-md-2 col-xs-2 diagram-item-title-right">
							<img class="diagram-item-title-right-img" src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/arrow.png" />
						</div>
					</div>
				</a>
			</div>
			<div id="activity-dia-collapse" class="panel-collapse collapse diagram-item-collapse">
				<div class="panel-body diagram-item-panel-body">
					<div class="row">
						<div class="col-md-4 col-xs-12 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/start.png" data-shape="InitialFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Initial" />
						</div>
						<div class="col-md-4 col-xs-12 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/exit.png" data-shape="FinalFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Final" />
						</div>
						<div class="col-md-4 col-xs-12 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/activity.png" data-shape="ActivityFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Action" />
						</div>
					</div>
					<div class="row">
						<div class="col-md-4 col-xs-12 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/swimlane.png" data-shape="VerticalSwimlaneFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Swimlane" />
						</div>
						<div class="col-md-4 col-xs-12 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/junction.png" data-shape="ChoiceFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Merge and Decision" />
						</div>
						<div class="col-md-4 col-xs-12 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/vertical-Fork-and-join.png" data-shape="HorizontalBarFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Fork and Join(Vertical)" />
						</div>
					</div>
					<div class="row">
						<div class="col-md-4 col-xs-12 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/horizontal-fork-and-join.png" data-shape="VerticalBarFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Fork and Join(Horizontal)" />
						</div>
					</div>
				</div>
			</div>
		</div>


		<!-- StateChart dia sidebar -->
		<div class="panel diagram-panel">
			<div class="panel-heading">
				<a data-toggle="collapse" class="diagram-item-title-collapse collapsed" href="#statechart-dia-collapse">
					<div class="row diagram-item-title-row">
						<div class="col-md-10 col-xs-10 diagram-item-title-center">Statechart Diagram</div>
						<div class="col-md-2 col-xs-2 diagram-item-title-right">
							<img class="diagram-item-title-right-img" src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/arrow.png" />
						</div>
					</div>
				</a>
			</div>
			<div id="statechart-dia-collapse" class="panel-collapse collapse diagram-item-collapse">
				<div class="panel-body diagram-item-panel-body">
					<div class="row">
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/start.png" data-shape="InitialFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Initial State" />
						</div>
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/exit.png" data-shape="FinalFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Final State" />
						</div>
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/state.png" data-shape="StateFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="State" />
						</div>
					</div>
					<div class="row">
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/junction.png" data-shape="ChoiceFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Choice" />
						</div>
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/vertical-Fork-and-join.png" data-shape="HorizontalBarFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Fork and Join(Horizontal)" />
						</div>
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/horizontal-fork-and-join.png" data-shape="VerticalBarFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Fork and Join(Vertical)" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- class dia sidebar -->
		<div class="panel diagram-panel">
			<div class="panel-heading">
				<a data-toggle="collapse" class="diagram-item-title-collapse collapsed" href="#class-dia-collapse">
					<div class="row diagram-item-title-row">
						<div class="col-md-10 col-xs-10 diagram-item-title-center">Class Diagram</div>
						<div class="col-md-2 col-xs-2 diagram-item-title-right">
							<img class="diagram-item-title-right-img" src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/arrow.png" />
						</div>
					</div>
				</a>
			</div>
			<div id="class-dia-collapse" class="panel-collapse collapse diagram-item-collapse">
				<div class="panel-body diagram-item-panel-body">
					<div class="row">
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/class.png" data-shape="ClassFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Class" />
						</div>
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/package.png" data-shape="PackageFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Package" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- sequence dia sidebar -->
		<div class="panel diagram-panel">
			<div class="panel-heading">
				<a data-toggle="collapse" class="diagram-item-title-collapse collapsed" href="#sequence-dia-collapse">
					<div class="row diagram-item-title-row">
						<div class="col-md-10 col-xs-10 diagram-item-title-center">Sequence Diagram</div>
						<div class="col-md-2 col-xs-2 diagram-item-title-right">
							<img class="diagram-item-title-right-img" src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/arrow.png" />
						</div>
					</div>
				</a>
			</div>
			<div id="sequence-dia-collapse" class="panel-collapse collapse diagram-item-collapse">
				<div class="panel-body diagram-item-panel-body">
					<div class="row">
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/sequence.png" data-shape="SequenceFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Sequence Lifeline" />
						</div>
						<div class="col-md-4 diagram-item">
							<span class="vertical-helper"></span><img src="${pageContext.request.contextPath}/img/editor/diagram_sidebar/diagram/package.png" data-shape="PackageFigure" class="palette_node_element draw2d_droppable" data-toggle="tooltip" title="Package" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
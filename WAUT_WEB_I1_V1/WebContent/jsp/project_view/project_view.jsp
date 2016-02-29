<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>
<!-- SLIDEBAR JAVASCRIPT(REQUIRED SLIDBAR VIEW) -->
<script src="${pageContext.request.contextPath}/js/project/projectSlidebarView/ProjectSlidebarView.js"></script>
<script src="${pageContext.request.contextPath}/js/project/projectSlidebarView/commentSlidebarView/CommentEntity.js"></script>
<script src="${pageContext.request.contextPath}/js/project/projectSlidebarView/commentSlidebarView/CommentSlidebarView.js"></script>
<script src="${pageContext.request.contextPath}/js/project/projectSlidebarView/logSlidebarView/LogEntity.js"></script>
<script src="${pageContext.request.contextPath}/js/project/projectSlidebarView/logSlidebarView/LogSlidebarView.js"></script>
<script src="${pageContext.request.contextPath}/js/project/projectSlidebarView/shareSlidebarView/ShareEntity.js"></script>
<script src="${pageContext.request.contextPath}/js/project/projectSlidebarView/shareSlidebarView/ShareSlidebarView.js"></script>

<script src="${pageContext.request.contextPath}/js/project/projectToolbarView/ProjectToolbarView.js"></script>

<script src="${pageContext.request.contextPath}/js/project/projectContentView/ProjectContentView.js"></script>
<script src="${pageContext.request.contextPath}/js/project/projectContentView/entityPanel/ProjectFile.js"></script>
<script src="${pageContext.request.contextPath}/js/project/projectContentView/entityPanel/ProjectFolder.js"></script>

<script src="${pageContext.request.contextPath}/js/project/projectMainView/ProjectMainView.js"></script>

<script type="text/javascript">
	$(window).load(function() {
		var serverRootPath = "${pageContext.request.contextPath}";
		var projectMainView = new ProjectMainView(serverRootPath);
	});
</script>
<div id="project-container" class="row fill-height no-padding">

	<!-- explorer view -->
	<div id="project-explorer-container" class="col-xs-12 col-md-2 fill-height no-padding">
		<jsp:include page="project_explorer_view.jsp" flush="false" />
	</div>
	
	<!-- project main view -->
	<div id="project-main-container" class="col-xs-12 col-md-10 fill-height no-padding">
		<jsp:include page="project_main_view.jsp" flush="false" />
	</div>

</div>
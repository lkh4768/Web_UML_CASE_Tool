<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>
<!DOCTYPE html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="shortcut icon" href="${pageContext.request.contextPath}/img/logo_mark.ico" type="image/x-icon">
<title>DrawUML</title>

<!-- BOOTSTRAP CSS (REQUIRED ALL VIEW)-->
<link rel="stylesheet" href="${pageContext.request.contextPath}/lib/css/bootstrap.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/lib/css/bootstrap-vertical-grid.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/lib/css/jquery.contextMenu.min.css">

<!-- CUSTOM CSS -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/header_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/modal.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/slidebar_view.css">

<!-- MAIN VIEW CSS -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main_view/footer_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main_view/index_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main_view/login_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main_view/join_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main_view/input_password_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main_view/user_modify_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main_view/user_leave_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main_view/id_pw_search_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main_view/userguide.css">

<!-- PROJECT VIEW CSS -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/project_view/project_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/project_view/project_explorer_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/project_view/project_main_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/project_view/project_toolbar_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/project_view/project_content_view.css">

<!-- EDITOR VIEW CSS -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/editor_view/editor_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/editor_view/toolbar_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/editor_view/diagram_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/editor_view/properties_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/editor_view/file_log_and_comment_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/editor_view/editor_canvas_view.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main_view/img_carousel.css">

<!-- MAIN JAVASRCIPT (REQUIRED ALL VIEW)-->
<script src="${pageContext.request.contextPath}/lib/js/jquery-1.11.3.min.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/jquery-2.1.4.min.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/jquery.ui.position.min.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/jquery.autoresize.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/jquery-touch_punch.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/jquery.contextMenu.min.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/jquery-ui-1.8.23.custom.min.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/jquery.browser.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/Class.js"></script>
<script src="${pageContext.request.contextPath}/lib/js/json2.js"></script>

<!-- MODAL JAVASCRIPT -->
<script src="${pageContext.request.contextPath}/js/modal/SmallModal.js"></script>
<script src="${pageContext.request.contextPath}/js/modal/InputModal.js"></script>
<script src="${pageContext.request.contextPath}/js/modal/ExplorerModal.js"></script>
<script src="${pageContext.request.contextPath}/js/modal/ImgModal.js"></script>

<script src="${pageContext.request.contextPath}/js/project/projectExplorerView/ProjectExplorerView.js"></script>
<script src="${pageContext.request.contextPath}/js/project/projectExplorerView/ProjectExplorerEntity.js"></script>
<script src="${pageContext.request.contextPath}/js/project/projectExplorerView/ProjectExplorerFile.js"></script>
</head>

<body>

	<!-- header -->
	<jsp:include page="header_view.jsp" flush="false" />

	<!-- container -->
	<div id="main-container" class="container">
		<jsp:include page="${contentPage}" flush="false" />
	</div>

</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>
<div id="project-title">
	<label id="project-title-label"></label>
</div>

<div id="project-toolbar">
	<jsp:include page="project_toolbar_view.jsp" flush="false" />
</div>

<jsp:include page="project_content_view.jsp" flush="false" />

<jsp:include page="../slidebar_view.jsp" flush="false" />
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>

<div id="folder-tree-container"></div>
<div id="trash-container">

	<div id="trash-container-top-border"></div>
	<div>
		<a id="move-trash-btn" class="project-explorer-btn" href="#">
			<img class="project-explorer-btn-img" src="${pageContext.request.contextPath}/img/project/explorer/trash.png" /> <span class="project-explorer-btn-span">휴지통</span>
		</a>
		<a id="empty-trash-btn" href="#">
		<%-- session 에 따라 헤더 달라지는 것--%>
			<c:choose>
				<%-- if --%>
				<c:when test="${delEntity}">
					<img id="empty-trash-btn-img" class="project-explorer-btn-img" src="${pageContext.request.contextPath}/img/project/explorer/trash_empty_over.png">
				</c:when>
				<%-- else --%>
				<c:otherwise>
					<img id="empty-trash-btn-img" class="project-explorer-btn-img" src="${pageContext.request.contextPath}/img/project/explorer/trash_empty.png">
				</c:otherwise>
			</c:choose>
		</a>
	</div>

</div>
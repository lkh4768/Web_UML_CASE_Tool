<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>
<div id="project-toolbar-whole">
	<div id="project-toolbar-left">

		<%-- 기본 툴바 --%>
		<div id="project-toolbar-add-dropdown-menu" class="dropdown project-toolbar-nonchecked-btn">
			<button type="button" class="btn btn-default project-toolbar-btn" data-toggle="dropdown" aria-expanded="true">
				<img class="project-toolbar-btn-img" src="${pageContext.request.contextPath}/img/project/toolbar/plus.png"> 생성
			</button>
			<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
				<li role="presentation"><a id="project-toolbar-add-folder-btn" role="menuitem" tabindex="-1" href="#">폴더</a></li>
				<li role="presentation"><a id="project-toolbar-add-file-btn" role="menuitem" tabindex="-1" href="#">파일</a></li>
			</ul>
		</div>
		<button type="button" id="project-toolbar-import-btn" class="btn btn-default project-toolbar-btn project-toolbar-nonchecked-btn">
			<img class="project-toolbar-btn-img" src="${pageContext.request.contextPath}/img/project/toolbar/import.png">가져오기
		</button>
		<input id="uploadFile" name="file" type="file" accept=".wml" style="display: none;" />
		<%-- 체크했을 때 기본 툴바--%>
		<button type="button" id="project-toolbar-del-btn" class="btn btn-default project-toolbar-btn project-toolbar-checked-btn">
			<img class="project-toolbar-btn-img" src="${pageContext.request.contextPath}/img/project/toolbar/delete_white.png">삭제
		</button>
		<button type="button" id="project-toolbar-move-btn" class="btn btn-default project-toolbar-btn project-toolbar-checked-btn">
			<img class="project-toolbar-btn-img" src="${pageContext.request.contextPath}/img/project/toolbar/move.png">이동
		</button>
		<button type="button" id="project-toolbar-copy-btn" class="btn btn-default project-toolbar-btn project-toolbar-checked-btn">
			<img class="project-toolbar-btn-img" src="${pageContext.request.contextPath}/img/project/toolbar/copy.png">복사
		</button>
		<button type="button" id="project-toolbar-export-btn" class="btn btn-default project-toolbar-btn project-toolbar-checked-btn">
			<img class="project-toolbar-btn-img" src="${pageContext.request.contextPath}/img/project/toolbar/export.png">내보내기
		</button>

		<%-- 휴지통에서 기본 툴바 --%>
		<button type="button" id="project-toolbar-trash-empty-btn" class="btn btn-default project-toolbar-btn project-toolbar-trash-btn">
			<img class="project-toolbar-btn-img" src="${pageContext.request.contextPath}/img/project/toolbar/empty.png">비우기
		</button>
		<button type="button" id="project-toolbar-trash-restore-btn" class="btn btn-default project-toolbar-btn project-toolbar-trash-btn">
			<img class="project-toolbar-btn-img" src="${pageContext.request.contextPath}/img/project/toolbar/plus.png">되살리기
		</button>
	</div>
	<div id="project-toolbar-right">
		<div id="project-toolbar-search-input-group-container">
			<div class="input-group" id="project-toolbar-search-input-group">
				<input type="text" class="form-control" id="project-toolbar-search-input" placeholder="Search for..."> <span class="input-group-btn">
					<button id = "project-toolbar-search-btn" class="btn btn-default project-toolbar-btn" type="button">
						<img class="project-toolbar-btn-img" src="${pageContext.request.contextPath}/img/project/toolbar/search.png">
					</button>
				</span>
			</div>
		</div>
		<div id="project-toolbar-check-btn-container">
			<button id="project-toolbar-check-btn" type="button" class="btn btn-default project-toolbar-white-btn">
				<img class="project-toolbar-btn-img" src="${pageContext.request.contextPath}/img/project/toolbar/check.png">
			</button>
		</div>
	</div>
</div>
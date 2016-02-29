<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>

<div id="editor-toolbar" class="navbar subnav" role="navigation">
	<div id="editor-toolbar-inner" class="navbar-collapse collapse">
		<ul class="nav navbar-nav">
			<!-- 저장하기 버튼 -->
			<li>
				<a id ="saveBtn" href="#">
					<i>
						<img src="${pageContext.request.contextPath}/img/editor/toolbar/save.png">
					</i>
					<span>저장하기</span>
				</a>
			</li>
			<!-- /저장하기 버튼 -->
			<li>
				<a id ="saveAsBtn" href="#">
					<i>
						<img src="${pageContext.request.contextPath}/img/editor/toolbar/save_as.png">
					</i>
					<span>새로 저장</span>
				</a>
			</li>
			<li>
				<a id ="openBtn" href="#">
					<i>
						<img src="${pageContext.request.contextPath}/img/folder_over.png">
					</i>
					<span>열기</span>
				</a>
			</li>
			<li>
				<a id ="newFileBtn" href="#">
					<i>
						<img src="${pageContext.request.contextPath}/img/editor/toolbar/new_file.png">
					</i>
					<span>새문서</span>
				</a>
			</li>
			<!-- 세로 구분선 -->
			<li>
				<img src="${pageContext.request.contextPath}/img/editor/toolbar/vertical_line.png">
			</li>
			<!-- /세로 구분선 -->
			<li>
				<a id ="undoBtn" href="#">
					<i>
						<img src="${pageContext.request.contextPath}/img/editor/toolbar/undo.png">
					</i>
					<span>되돌리기</span>
				</a>
			</li>
			<li>
				<a id ="redoBtn" href="#">
					<i>
						<img src="${pageContext.request.contextPath}/img/editor/toolbar/redo.png">
					</i>
					<span>다시실행</span>
				</a>
			</li>
			<li>
				<img src="${pageContext.request.contextPath}/img/editor/toolbar/vertical_line.png">
			</li>
			<li>
				<a id ="importBtn" href="#">
					<i>
						<img src="${pageContext.request.contextPath}/img/import.png">
					</i>
					<span>가져오기</span>
				</a>
				<input id="uploadFile" name="file" type="file" accept=".wml" style="display:none;"/>
			</li>
			<li>
				<a id ="exportBtn" href="#"> 
					<i>
						<img src="${pageContext.request.contextPath}/img/export.png">
					</i>
					<span>내보내기</span>
				</a>
			</li>
		</ul>
	</div>
</div>
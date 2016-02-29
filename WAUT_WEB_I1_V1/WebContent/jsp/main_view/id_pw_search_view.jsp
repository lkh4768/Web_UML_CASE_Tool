<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>

<script src="${pageContext.request.contextPath}/js/main/IdPwSearchView.js"></script>
<script type="text/javascript">
	$(window).load(function() {
		
		var idPwSearchView = new IdPwSearchView("${pageContext.request.contextPath}");
	});
</script>

<div id="id-pw-search-container">
	<img id="logo-mark-img" src="${pageContext.request.contextPath}/img/main/logo_mark.png" />

	<div id="id-pw-search-form-container">
		<div id="id-pw-search-top-container">
			<span id="id-pw-search-title">아이디/비밀번호 찾기</span>
		</div>
		<form id="form-id-pw-search" class="form-id-pw-search form-horizontal" method="post" action="${pageContext.request.contextPath}/user">
			<input type="hidden" name="action" id="actionId" value="">
			<div class="form-group from-group-id-pw-search">
				<label class="control-label col-sm-4 id-pw-search-label">비상이메일</label>

				<div class="col-sm-8">
					<input id="emergencyEmail" name="email" class="form-control" placeholder="Second Email" required>
				</div>
			</div>
			<div class="message">
				<c:if test="${not empty result}">
					<c:if test="${result}">
						<div>전송이 완료되었습니다.</div>
					</c:if>
					<c:if test="${not result}">
						<div>일치하는 정보가 없습니다.</div>
					</c:if>
				</c:if>
			</div>
			<div id="search-btn">
				<button class="btn btn-lg btn-primary id-pw-search-btn" id="id-search-btn" type="button">아이디 찾기</button>
				<button class="btn btn-lg btn-primary id-pw-search-btn" id="pw-search-btn" type="button">비밀번호 찾기</button>
			</div>
		</form>
	</div>
</div>
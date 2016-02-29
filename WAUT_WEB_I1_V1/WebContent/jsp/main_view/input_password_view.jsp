
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>

<div id="password-input-container">
	<img id="password-input-logo-mark-img" src="${pageContext.request.contextPath}/img/main/logo_mark.png" />
	<div id="password-input-form-container">
		<div id="password-input-top-container">
			<span id="password-input-title">비밀번호를 입력해주세요</span>
		</div>

		<form class="form-password-input form-horizontal" method="post"  action="${pageContext.request.contextPath}/user?action=checkPw">
			<input type="hidden" name="nextPage" value="${nextPage}">
			<div class="form-group from-group-password-input form-group-id">
				<label class="control-label col-sm-4 password-input-label">아이디</label>

				<div class="col-sm-8 input-email-box">
					<label class="input-email">${sessionScope.id}</label>
				</div>
			</div>
			<div class="form-group from-group-password-input">
				<label class="control-label col-sm-4 password-input-label" for="password">비밀번호</label>

				<div class="col-sm-8">
					<input type="password" id="pw" name="pw" class="form-control" placeholder="Password">
				</div>
			</div>
			<c:if test="${not result}">
				<div class="error">비밀번호가 일치하지 않습니다.</div>
			</c:if>
			<button class="btn btn-lg btn-primary" id="input-password-btn" type="submit">확인</button>
		</form>
	</div>

</div>
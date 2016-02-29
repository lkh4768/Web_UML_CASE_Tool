<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>

<div id="login-container">
	<img id="logo-mark-img-login" src="${pageContext.request.contextPath}/img/main/logo_mark.png" />

	<div id="login-form-container">
		<div id="login-top-container">
			<span id="login-title">로그인</span>
		</div>
		<form class="form-login form-horizontal" method="post" action="${pageContext.request.contextPath}/user?action=login">
			<div class="form-group from-group-login form-group-id">
				<label class="control-label col-sm-4 login-label" for="email">아이디</label>

				<div class="col-sm-8">
					<input type="text" id="email" class="form-control" placeholder="Email address" name="id">
				</div>
			</div>
			<div class="form-group from-group-login">
				<label class="control-label col-sm-4 login-label" for="password">비밀번호</label>

				<div class="col-sm-8">
					<input type="password" id="password" class="form-control" placeholder="Password" name="pw">
				</div>
			</div>
			<c:if test="${not result}">
				<div class="error">일치하는 정보가 없습니다.</div>
			</c:if>
			<div id="id-pw-search-contanier">
				<a href="${pageContext.request.contextPath}/user?action=idPwSearchPage">아이디/비밀번호 찾기</a>
			</div>
			<button class="btn btn-lg btn-primary" id="login-btn" type="submit">로그인</button>
		</form>
	</div>
</div>
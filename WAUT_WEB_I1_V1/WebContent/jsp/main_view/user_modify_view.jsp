<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>

<script src="${pageContext.request.contextPath}/js/main/UserModifyView.js"></script>
<script type="text/javascript">
	$(window).load(function() {
		
		var userModifyView = new UserModifyView("${pageContext.request.contextPath}");
	});
</script>

<div id="user-modify-container">
	<img id="logo-mark-img" src="${pageContext.request.contextPath}/img/main/logo_mark.png" />

	<div id="user-modify-form-container">
		<div id="user-modify-top-container">
			<span id="user-modify-title">회원정보 수정</span>
		</div>
		<form class="form-user-modify form-horizontal" id="userModifyForm" method="post" action="${pageContext.request.contextPath}/user?action=modify">
			<input type="hidden" name="id" value="${sessionScope.id}">
			<div class="form-group from-group-user-modify">
				<div class="form-group from-group-user-modify form-group-id">
					<label class="control-label col-sm-4 user-modify-label">아이디</label>

					<div class="col-sm-8 input-email-box">
						<label class="input-email" id="user-modify-id">${sessionScope.id}</label>
					</div>
				</div>
				<div class="form-group from-group-user-modify form-group-id">
					<label class="control-label col-sm-4 user-modify-label" for="email">닉네임</label>

					<div class="col-sm-8">
						<input id="user-modify-inputName" name="name" class="form-control input-user-modify" placeholder="Nicname" value="${sessionScope.name}">
					</div>

					<img src="${pageContext.request.contextPath}/img/main/warning_over.png" class="check-value-img" data-toggle="tooltip" data-placement="bottom" title="사용 가능한 닉네임입니다.">
				</div>

				<div class="form-group from-group-user-modify">
					<label class="control-label col-sm-4 user-modify-label" for="password">새 비밀번호</label>

					<div class="col-sm-8">
						<input id="user-modify-inputPassword" name="pw" type="password" class="form-control input-user-modify" placeholder="New Password">
					</div>

					<img src="${pageContext.request.contextPath}/img/main/warning_over.png" class="check-value-img" data-toggle="tooltip" data-placement="bottom" title="">
				</div>

				<div class="form-group from-group-user-modify">
					<label class="control-label col-sm-4 user-modify-label" for="password">새 비밀번호 확인</label>

					<div class="col-sm-8">
						<input id="user-modify-inputRePassword" type="password" class="form-control input-user-modify" placeholder="New Password Confirm">
					</div>
					<img src="${pageContext.request.contextPath}/img/main/warning_over.png" class="check-value-img" data-toggle="tooltip" data-placement="bottom" title="">

					<div class="message text-warning">비밀번호는 8자리 이상이여야 합니다.</div>
				</div>

				<div class="form-group from-group-user-modify">
					<label class="control-label col-sm-4 user-modify-label">비상 이메일</label>

					<div class="col-sm-8">
						<input id="user-modify-inputEmergencyEmail" name="emergencyEmail" class="form-control input-user-modify" placeholder="Second Email" value="${sessionScope.email}">
					</div>

					<img src="${pageContext.request.contextPath}/img/main/warning_over.png" class="check-value-img" data-toggle="tooltip" data-placement="bottom" title="사용 가능한 비상 이메일입니다.">
				</div>

			</div>
			<button id="user-modify-btn" class="btn btn-lg btn-primary" type="button">확인</button>
		</form>
	</div>
</div>
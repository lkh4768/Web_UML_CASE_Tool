<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>

<script src="${pageContext.request.contextPath}/js/main/JoinView.js"></script>
<script type="text/javascript">
	$(window).load(function() {
		
		var joinView = new JoinView("${pageContext.request.contextPath}");
	});
</script>

<div id="join-container">
	<div id="join-form-container">
		<img id="logo-mark-img-join" src="${pageContext.request.contextPath}/img/main/logo_mark.png" />

		<div id="join-top-container">
			<span id="join-title">회원가입</span>
		</div>
		<form class="form-join form-horizontal" id="joinForm" method="post" action="${pageContext.request.contextPath}/user?action=join">
			<div class="form-group from-group-join">
				<div class="form-group from-group-join form-group-id">
					<label class="control-label col-sm-4 join-label" for="email">아이디</label>

					<div class="col-sm-8">
						<input id="inputId" type="email" name="id" class="form-control input-join" placeholder="Email">
					</div>
					<img src="${pageContext.request.contextPath}/img/main/warning.png" class="check-value-img" data-toggle="tooltip" data-placement="bottom" title="이메일 형식이 틀립니다.">
				</div>

				<div class="form-group from-group-join form-group-pass-number">
					<label class="control-label col-sm-4 join-label pass-number-label">인증번호</label>

					<div class="col-sm-3">
						<input id="inputPassNum" type="text" name="passNum" class="form-control input-join" placeholder="Number">
					</div>
					<div class="col-sm-3" id="pass-number-btn-container">
						<button id="passNumBtn" class="btn btn-lg btn-primary" type="button">인증번호 받기</button>
					</div>
					<img src="${pageContext.request.contextPath}/img/main/warning.png" class="check-value-img" data-toggle="tooltip" data-placement="bottom" title="인증번호가 틀립니다.">
				</div>

				<div class="form-group from-group-join">
					<label class="control-label col-sm-4 join-label">비상 이메일</label>

					<div class="col-sm-8">
						<input id="inputEmergencyEmail" type="email" name="emergencyEmail" class="form-control input-join" placeholder="Emergency Email">
					</div>
					<img src="${pageContext.request.contextPath}/img/main/warning.png" class="check-value-img" data-toggle="tooltip" data-placement="bottom" title="이메일 형식이 틀립니다.">

					<div class="message text-warning">아이디/비밀번호를 찾기 위한 이메일입니다.</div>
				</div>

				<div class="form-group from-group-join">
					<label class="control-label col-sm-4 join-label" for="password">비밀번호</label>

					<div class="col-sm-8">
						<input id="inputPassword" name="pw" type="password" class="form-control input-join" placeholder="Password">
					</div>
					<img src="${pageContext.request.contextPath}/img/main/warning.png" class="check-value-img" data-toggle="tooltip" data-placement="bottom" title="비밀번호는 8자리 이상이여야 합니다.">

					<div class="message text-warning">비밀번호는 8자리 이상이여야 합니다.</div>
				</div>

				<div class="form-group from-group-join">
					<label class="control-label col-sm-4 join-label" for="password">비밀번호 확인</label>

					<div class="col-sm-8">
						<input id="inputRePassword" type="password" name="pwCheck" class="form-control input-join" placeholder="Re-Password">
					</div>
					<img src="${pageContext.request.contextPath}/img/main/warning.png" class="check-value-img" data-toggle="tooltip" data-placement="bottom" title="비밀번호와 일치하지 않습니다.">
				</div>

				<div class="form-group from-group-join">
					<label class="control-label col-sm-4 join-label" for="password">닉네임</label>

					<div class="col-sm-8">
						<input id="inputName" name="name" type="text" class="form-control input-join" placeholder="Nicname">
					</div>
					<img src="${pageContext.request.contextPath}/img/main/warning.png" class="check-value-img" data-toggle="tooltip" data-placement="bottom" title="닉네임을 입력해주세요.">
				</div>

			</div>

			<button id="joinBtn" class="btn btn-lg btn-primary" type="button">확인</button>
		</form>
	</div>
</div>
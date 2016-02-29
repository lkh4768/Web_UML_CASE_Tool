<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>
<script>
	$(window).load(function() {
		$("#leaveCancelBtn").click(function() {
			$("#form-user-leave").attr("action", "${pageContext.request.contextPath}/user?action=indexPage");
			$("#form-user-leave").submit();
		});
	});
</script>
<div id="user-leave-container">
	<img id="logo-mark-img" src="${pageContext.request.contextPath}/img/main/logo_mark.png" />

	<div id="user-leave-form-container">
		<div id="user-leave-top-container">
			<span id="user-leave-title">회원탈퇴</span>
		</div>
		<form class="form-user-leave form-horizontal" id="form-user-leave" method="post" action="${pageContext.request.contextPath}/user?action=leave">

			<div class="form-group from-group-user-leave">
				<label class="control-label col-sm-4 user-leave-label" for="password">비밀번호</label>

				<div class="col-sm-8">
					<input type="password" id="pw" name="pw" class="form-control" placeholder="Password">
				</div>
			</div>
			<div class="error">회원 계정이 영구적으로 삭제됩니다.</div>
			<c:if test="${not result}">
				<div class="error">비밀번호가 일치하지 않습니다.</div>
			</c:if>
			<div id="user-leave-btn-group">
				<button class="btn btn-lg btn-primary user-leave-btn" id="leaveBtn" type="submit">회원탈퇴</button>
				<button class="btn btn-lg btn-primary user-leave-btn" id="leaveCancelBtn" type="button">취소</button>
			</div>
		</form>
	</div>
</div>
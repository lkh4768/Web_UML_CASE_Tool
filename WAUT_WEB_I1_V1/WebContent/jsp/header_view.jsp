<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>

<!-- HEADER VIEW JAVASCRIPT(REQUIRED HEADER VIEW) -->
<script src="${pageContext.request.contextPath}/js/HeaderView.js"></script>

<script type="text/javascript">
	$(window).load(function() {
		//헤더 뷰 설정
		var headerView = new HeaderView();
	});
</script>

<nav class="navbar navbar-fixed-top">
	<div id="header-container-fluid" class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="${pageContext.request.contextPath}/user?action=indexPage"><img src="${pageContext.request.contextPath}/img/logo.png"></a>
		</div>
		<div id="header-nav" class="navbar-collapse collapse">
			<%-- session 에 따라 헤더 달라지는 것--%>
			<c:choose>
				<%-- if --%>
				<c:when test="${not empty sessionScope.id}">
					<ul class="nav navbar-nav navbar-right">
						<li class="header-nav-item">
						 	<a href="${pageContext.request.contextPath}/user?action=userguidePage">
						 		<img src="${pageContext.request.contextPath}/img/header/userguide.png"> 사용자가이드
						 	</a>
                    	</li>
						<li class="header-nav-item"><a href="${pageContext.request.contextPath}/project?action=projectPage&userID=${sessionScope.id}"><img src="${pageContext.request.contextPath}/img/header/project.png"> 프로젝트</a></li>
						<li class="header-nav-item dropdown ">
							<a id="header-user-id" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" uname="${sessionScope.name}" uid="${sessionScope.id}">
								<img src="${pageContext.request.contextPath}/img/header/user.png"> ${sessionScope.name}(${sessionScope.id})
							</a>
							<ul class="dropdown-menu">
								<li><a href="${pageContext.request.contextPath}/user?action=inputPasswordPage&nextPage=userModify">회원정보수정</a></li>
								<li role="separator" class="divider"></li>
								<li><a href="${pageContext.request.contextPath}/user?action=inputPasswordPage&nextPage=userLeave">회원탈퇴</a></li>
							</ul></li>
						<li class="header-nav-item"><a href="${pageContext.request.contextPath}/user?action=logout"><img src="${pageContext.request.contextPath}/img/header/logout.png"> 로그아웃</a></li>
					</ul>
				</c:when>

				<%-- else --%>
				<c:otherwise>
					<ul class="nav navbar-nav navbar-right">
						<li class="header-nav-item">
						 	<a href="${pageContext.request.contextPath}/user?action=userguidePage">
						 		<img src="${pageContext.request.contextPath}/img/header/userguide.png"> 사용자가이드
						 	</a>
                    	</li>
						<li class="header-nav-item">
							<a href="${pageContext.request.contextPath}/user?action=loginPage">
								<img src="${pageContext.request.contextPath}/img/header/login.png"> 로그인
							</a>
						</li>
						<li class="header-nav-item">
							<a href="${pageContext.request.contextPath}/user?action=joinPage">
								<img src="${pageContext.request.contextPath}/img/header/join.png"> 회원가입
							</a>
						</li>
					</ul>
				</c:otherwise>
			</c:choose>
		</div>
	</div>
</nav>
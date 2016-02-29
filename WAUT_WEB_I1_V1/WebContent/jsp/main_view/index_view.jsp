<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>

<div id="index-container">
	<div id="carouselbox">
		<jsp:include page="img_carousel.jsp" flush="false" />
	</div>
	<div id="explanation" class="row">
		<div class="explanation-title col-xs-12">
			<p><span id="title-drawuml">“DrawUML”</span>은 웹(Web)을 기반으로 하는 협업 가능한 <span class="title-sub">UML 도구</span>이다.
			<p>기존에 알려진 UML 도구(Tool)의 불필요한 기능을 줄여 사용하기 쉽고 단순한 시스템을 제공한다. 
			<p>또한 팀원 간의 활발한 의사소통을 위한 <span class="title-sub">협업 기능</span>을 제공하여 도구의 범위를 확장한다.
		</div>
		<div class="explanation-item col-xs-4">
			<img src="${pageContext.request.contextPath}/img/main/index/uml_case_tool.png" class="explanation-item-img" />
		</div>
		<div class="explanation-item col-xs-4">
			<img src="${pageContext.request.contextPath}/img/main/index/collaboration.png" class="explanation-item-img" />
		</div>
		<div class="explanation-item col-xs-4">
			<img src="${pageContext.request.contextPath}/img/main/index/open_source.png" class="explanation-item-img" />
		</div>
	</div>
</div>
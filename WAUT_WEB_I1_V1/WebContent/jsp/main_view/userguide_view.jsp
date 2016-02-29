<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/jsp/common/directive.jsp"%>

<div id="userguide-container">
	<div class="row">
        <div id="userguide-menu-sidebar" class="col-sm-3 col-sm-2">
            <ul class="nav nav-sidebar">
                <li class><a href="#overview" class="dark-gray-text-color">1. 개요</a></li>
                <li class><a href="#overview-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">1.1 DrawUML 개요</a></li>
                <li class><a href="#overview-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">1.2 시스템 요구사항</a></li>
                <li class><a href="#fundamental-concept" class="dark-gray-text-color">2. 기본 개념</a></li>
                <li class><a href="#fundamental-concept-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">2.1 접속 방법</a></li>
                <li class><a href="#fundamental-concept-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">2.2 용어 설명</a></li>
                <li class><a href="#web-main-screen" class="dark-gray-text-color">3. Web Main 화면</a></li>
                <li class><a href="#web-main-screen-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">3.1 회원가입</a></li>
                <li class><a href="#web-main-screen-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">3.2 로그인</a></li>
                <li class><a href="#web-main-screen-3" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">3.3 아이디/비밀번호 찾기</a></li>
                <li class><a href="#web-main-screen-4" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">3.4 회원정보 수정</a></li>
                <li class><a href="#web-main-screen-5" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">3.5 회원탈퇴</a></li>
                <li class><a href="#web-project-screen" class="dark-gray-text-color">4. Web Project 화면</a></li>
                <li class><a href="#web-project-screen-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">4.1 프로젝트 메인</a></li>
                <li class><a href="#web-project-screen-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">4.2 프로젝트 익스플로러</a></li>
                <li class><a href="#web-project-screen-3" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">4.3 프로젝트 컨텐츠 뷰</a></li>
                <li class><a href="#web-project-screen-3-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">4.3.1 공유/공유해제</a></li>
                <li class><a href="#web-project-screen-3-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">4.3.2 파일/폴더 설정</a></li>
                <li class><a href="#web-project-screen-3-3" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">4.3.3 댓글</a></li>
                <li class><a href="#web-project-screen-3-4" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">4.3.4 상단 버튼</a></li>
                <li class><a href="#web-editor-screen" class="dark-gray-text-color">5. Web Editor 화면</a></li>
                <li class><a href="#web-editor-screen-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">5.1 도구모음</a></li>
                <li class><a href="#web-editor-screen-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">5.2 다이어그램별 도형목록</a></li>
                <li class><a href="#web-editor-screen-3" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">5.3 캔버스</a></li>
                <li class><a href="#web-editor-screen-4" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">5.4 로그 및 댓글</a></li>
                <li class><a href="#web-editor-screen-5" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">5.5 속성</a></li>
                <li class><a href="#diagram-modeling" class="dark-gray-text-color">6. 다이어그램 모델링</a></li>
                <li class><a href="#diagram-modeling-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">6.1 UseCase Diagram</a></li>
                <li class><a href="#diagram-modeling-1-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.1.1 요소</a></li>
                <li class><a href="#diagram-modeling-1-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.1.2 Actor</a></li>
                <li class><a href="#diagram-modeling-1-3" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.1.3 UseCase</a></li>
                <li class><a href="#diagram-modeling-1-4" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.1.4 System</a></li>
                <li class><a href="#diagram-modeling-1-5" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.1.5 Package</a></li>
                <li class><a href="#diagram-modeling-1-6" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.1.6 Association</a></li>
                <li class><a href="#diagram-modeling-1-7" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.1.7 DirectedAssociation</a></li>
                <li class><a href="#diagram-modeling-1-8" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.1.8 Generalization</a></li>
                <li class><a href="#diagram-modeling-1-9" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.1.9 Dependency</a></li>
                <li class><a href="#diagram-modeling-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">6.2 Communication Diagram</a></li>
                <li class><a href="#diagram-modeling-2-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.2.1 요소</a></li>
                <li class><a href="#diagram-modeling-2-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.2.2 Communication Lifeline</a></li>
                <li class><a href="#diagram-modeling-2-3" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.2.3 Send Message</a></li>
                <li class><a href="#diagram-modeling-3" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">6.3 Activity Diagram</a></li>
                <li class><a href="#diagram-modeling-3-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.3.1 요소</a></li>
                <li class><a href="#diagram-modeling-3-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.3.2 Initial</a></li>
                <li class><a href="#diagram-modeling-3-3" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.3.3 Final</a></li>
                <li class><a href="#diagram-modeling-3-4" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.3.4 Activity</a></li>
                <li class><a href="#diagram-modeling-3-5" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.3.5 Swimlane</a></li>
                <li class><a href="#diagram-modeling-3-6" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.3.6 Choice</a></li>
                <li class><a href="#diagram-modeling-3-7" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.3.7 Fork and Join(Vertical)</a></li>
                <li class><a href="#diagram-modeling-3-8" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.3.8 Fork and Join(Horizontal)</a></li>
                <li class><a href="#diagram-modeling-3-9" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.3.9 Arrow Connection</a></li>
                <li class><a href="#diagram-modeling-4" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">6.4 Statechart Diagram</a></li>
                <li class><a href="#diagram-modeling-4-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.4.1 요소</a></li>
                <li class><a href="#diagram-modeling-4-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.4.2 Initial</a></li>
                <li class><a href="#diagram-modeling-4-3" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.4.3 Final</a></li>
                <li class><a href="#diagram-modeling-4-4" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.4.4 State</a></li>
                <li class><a href="#diagram-modeling-4-5" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.4.5 Choice</a></li>
                <li class><a href="#diagram-modeling-4-6" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.4.6 Fork and Join(Vertical)</a></li>
                <li class><a href="#diagram-modeling-4-7" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.4.7 Fork and Join(Horizontal)</a></li>
                <li class><a href="#diagram-modeling-4-8" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.4.8 Arrow Connection</a></li>
                <li class><a href="#diagram-modeling-5" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">6.5 class Diagram</a></li>
                <li class><a href="#diagram-modeling-5-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.5.1 요소</a></li>
                <li class><a href="#diagram-modeling-5-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.5.2 Class</a></li>
                <li class><a href="#diagram-modeling-5-3" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.5.3 Package</a></li>
                <li class><a href="#diagram-modeling-5-4" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.5.4 Association</a></li>
                <li class><a href="#diagram-modeling-5-5" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.5.5 Directed Association</a></li>
                <li class><a href="#diagram-modeling-5-6" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.5.6 Aggregation</a></li>
                <li class><a href="#diagram-modeling-5-7" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.5.7 Composition</a></li>
                <li class><a href="#diagram-modeling-5-8" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.5.8 Generalization</a></li>
                <li class><a href="#diagram-modeling-5-9" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.5.9 Dependency</a></li>
                <li class><a href="#diagram-modeling-6" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">6.6 sequence Diagram</a></li>
                <li class><a href="#diagram-modeling-6-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.6.1 요소</a></li>
                <li class><a href="#diagram-modeling-6-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.6.2 Sequence Lifeline</a></li>
                <li class><a href="#diagram-modeling-6-3" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.6.3 Package</a></li>
                <li class><a href="#diagram-modeling-6-4" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.6.4 Message</a></li>
                <li class><a href="#diagram-modeling-6-5" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.6.5 Reply Message</a></li>
                <li class><a href="#diagram-modeling-6-6" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 50px;">6.6.6 Dependency</a></li>
                <li class><a href="#file-folder-delete-recovery" class="dark-gray-text-color">7. 파일/폴더 삭제 및 복구</a></li>
                <li class><a href="#file-folder-delete-recovery-1" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">7.1 파일/폴더 삭제</a></li>
                <li class><a href="#file-folder-delete-recovery-2" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">7.2 파일/폴더 삭제</a></li>
                <li class><a href="#file-folder-delete-recovery-2-1"
                             class="userguide-menu-subtitle dark-gray-text-color" style="padding-left: 50px;">7.2.1 단일
                    파일/폴더 되살리기</a></li>
                <li class><a href="#file-folder-delete-recovery-2-2"
                             class="userguide-menu-subtitle dark-gray-text-color" style="padding-left: 50px;">7.2.2 다중
                    파일/폴더 되살리기</a></li>
                <li class><a href="#file-folder-delete-recovery-3" class="userguide-menu-subtitle dark-gray-text-color"
                             style="padding-left: 30px;">7.3 휴지통 비우기</a></li>
                <li class><a href="#file-folder-delete-recovery-3-1"
                             class="userguide-menu-subtitle dark-gray-text-color" style="padding-left: 50px;">7.3.1 휴지통
                    화면에서 휴지통 비우기</a></li>
                <li class><a href="#file-folder-delete-recovery-3-2"
                             class="userguide-menu-subtitle dark-gray-text-color" style="padding-left: 50px;">7.3.2 프로젝트
                    화면에서 휴지통 비우기</a></li>

            </ul>
        </div>
    </div>
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2">
        <div class="userguide-main-container">
            <h2 id="overview" class="userguide-page-header page-header">
                <a class="userguide-page-header">1. 개요</a>
            </h2>

            <h3 id="overview-1" class="userguide-page-sub-header">
                1.1 DrawUML 개요
            </h3>

            <p class="userguide-main-container-lead">
                DrawUML은 웹(Web)을 기반으로 하는 협업 가능한 UML도구이다. UML Standard Profile (v2)를 기반으로 하고있다.
                총 6가지의 다이어그램(UseCase, Communication, Activity, Statechart, Class, Sequence)을 지원하며 UML 도구(Tool)의
                불필요한 기능을 줄여 사용하기 쉽고 단순한 시스템을 제공한다. 사용자가 운영체제 환경에 구애 받지 않고 다이어그램 모델링을 할 수 있다.
                또한 타 사용자들과 협업을 지원하는 기능들을 통해 프로젝트의 생산성과 품질을 높일 수 있다.
            </p>
            <ul>
                <li class="list-title">
                    운영체제에 독립적인 UML 도구
                </li>
                <p>웹(Web)을 기반으로 하는 도구이기 때문에 운영체제에 따른 제약이 없다. DrawUML은 다양한 운영체제에서 사용 가능한 UML 도구이다.</p>
            </ul>
            <ul>
                <li class="list-title">
                    협업을 지원하는 UML 도구
                </li>
                <p class="list-title-end">DrawUML은 사용자간 협업을 가능하게 하는 폴더 공유 기능을 제공한다. 또한 협업을 극대화 할 수 있는 로그 기능, 댓글 기능 등을 함께
                    제공한다.</p>
            </ul>

            <h3 id="overview-2" class="userguide-page-sub-header">
                1.2 시스템 요구사항
            </h3>

            <p class="userguide-main-container-lead list-title-end">
                DrawUML을 구동하기 위해서는 다음과 같은 요구사항이 만족되어야 한다.
            </p>

            <h2 id="fundamental-concept" class="userguide-page-header page-header">
                <a class="userguide-page-header" href="#fundamental-concept">2. 기본 개념</a>
            </h2>

            <h3 id="fundamental-concept-1" class="userguide-page-sub-header">
                2.1 접속 방법
            </h3>

            <p class="userguide-main-container-lead list-title-end">
                웹(Web) 브라우저의 주소창에 ‘http://main.drawuml.kr.pe/’를 입력한 후 접속한다.
            </p>

            <h3 id="fundamental-concept-2" class="userguide-page-sub-header">
                2.2 용어 설명
            </h3>
            <ul>
                <li class="list-title">
                    화면
                </li>
            </ul>
            <div class="row list-title-end">
                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_main.JPG">
                    </a>
                    <h4>Web Main 화면</h4>

                    <p>본 웹 도구(Web Tool)에 접속했을 때 최초로 나타나는 화면</p>
                </div>
                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_project_main_view.JPG">
                    </a>
                    <h4>Web Projcet 화면</h4>

                    <p>로그인 후 화면 상단의 프로젝트 아이콘을 클릭했을 때 접근할 수 있는 화면</p>
                </div>
                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_editor.JPG">
                    </a>
                    <h4>Web Editor 화면</h4>

                    <p>파일을 편집할 수 있는 화면</p>
                </div>
            </div>
            <ul>
                <li class="list-title">
                    프로젝트
                </li>
                <p>프로젝트는 내 프로젝트와 공유 프로젝트로 구분된다. 내 프로젝트는 사용자 자신이 생성한 폴더들의 리스트이다.
                    사용자는 내 프로젝트에서 폴더를 생성한 후 공유 멤버를 추가할 수 있다. 공유 프로젝트는 타 사용자에게 공유를 받은 프로젝트이다.
                    내 프로젝트와 공유 프로젝트에서의 권한은 차이가 있다. 공유 멤버들은 프로젝트 내부의 폴더 및 파일에 대해 모두 접근 권한을 갖는다.</p>
            </ul>
            <ul>
                <li class="list-title">
                    폴더
                </li>
                <p>폴더는 파일 또는 폴더들을 체계적으로 관리하기 위한 것이다. 폴더 내부에는 새로운 폴더가 생성될 수 있다.</p>
            </ul>
            <ul>
                <li class="list-title">
                    파일
                </li>
                <p>파일은 wml파일형태로 저장되며 확장명은 “.wml”이다.</p>
            </ul>
            <ul>
                <li class="list-title">
                    로그
                </li>
                <p>파일 수정에 관한 내용을 기록한다. 로그는 파일의 내용이 수정 될 때 수정한 날짜, 수정한 공유 멤버의 닉네임, 수정한 내용을 포함한다.
                    로그 인터페이스 상단에는 파일 보기, 파일 수정, 파일 저장이 있다.</p>
            </ul>
            <ul>
                <li class="list-title">
                    댓글
                </li>
                <p>파일에 대해 공유 멤버들은 댓글을 생성 할 수 있다. 자신이 생성한 댓글에 한해 수정 및 삭제가 가능하다.</p>
            </ul>
            <ul>
                <li class="list-title">
                    공유자
                </li>
                <p>폴더를 공유하는 사용자를 지칭한다. 공유폴더에 존재하는 폴더 및 파일에 대한 접근 권한을 가진다. </p>
            </ul>
            <ul>
                <li class="list-title">
                    공유 멤버
                </li>
                <p>폴더를 공유 받은 사용자들을 지칭한다. 공유폴더에 존재하는 폴더 및 파일에 대한 접근 권한을 가진다.</p>
            </ul>
            <ul>
                <li class="list-title">
                    포트
                </li>
                <p>포트는 도형간 연결을 가능하게 해주는 연결점을 지칭한다.
                    포트가 추가된 도형끼리의 연결을 통해 도형간의 관계를 설정한다. 포트를 추가해야만 도형간의 관계를 설정할 수 있다.</p>
            </ul>
            <h2 id="web-main-screen" class="userguide-page-header page-header">
                <a class="userguide-page-header">3. Web Main 화면</a>
            </h2>

            <h3 id="web-main-screen-1" class="userguide-page-sub-header">
                3.1 회원가입
            </h3>

            <p class="userguide-main-container-lead">
                사용자는 Main화면 우측 상단의 “회원가입” 버튼을 통해 회원가입 화면으로 접근할 수 있다.
                아이디로 사용할 이메일을 입력한 후 인증번호 받기를 클릭하면 입력한 이메일로 인증번호가 전송된다.
                이메일로 전송 받은 인증번호를 입력하면 시스템은 인증 여부를 판단한다.
                <br>사용자는 비상이메일, 비밀번호, 비밀번호 확인과 닉네임을 입력한 후 확인 버튼을 클릭하면 회원가입이 완료된다.
            </p>

            <div class="row list-title-end">
                <div class="col-xs-6 col-md-4 userguide-web-main-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_join.png">
                    </a>
                </div>
                <ul id="row-join-content">
                    <li class="list-title">
                        회원가입 시, 회원정보 기입 방법
                    </li>
                    <p>회원가입시 아이디로 사용할 이메일은 중복이 불가하다. 인증번호는 아이디로 사용할 이메일로 발송된다.
                        비상이메일은 아이디/비밀번호 찾기를 위해 사용되며 비상이메일은 아이디로 사용될 이메일과 중복 불가능하다.
                        비밀번호는 8자리 이상을 입력해야 하며 비밀번호와 비밀번호 확인은 일치해야한다. 닉네임은 공백을 입력할 수 없다.</p>
                </ul>
            </div>
            <div class="row">
                <h3 id="web-main-screen-2" class="userguide-page-sub-header">
                    3.2 로그인
                </h3>

                <p class="userguide-main-container-lead">
                    사용자는 우측 상단의 “로그인” 버튼을 통해 로그인 화면으로 접근할 수 있다.
                    사용자는 회원가입 시 입력했던 아이디와 비밀번호로 로그인 한다.
                    사용자가 데이터베이스에 존재하지 않는 아이디/비밀번호를 입력하면 경고 메시지가 띄워지고 로그인 되지 않는다.
                </p>

                <div class="col-xs-6 col-md-4 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_login.png">
                    </a>
                </div>
            </div>
            <div class="row">
                <h3 id="web-main-screen-3" class="userguide-page-sub-header">
                    3.3 아아디/비밀번호 찾기
                </h3>

                <p class="userguide-main-container-lead">
                    사용자는 로그인 화면에서 아이디/비밀번호 찾기 화면으로 접근할 수 있다.
                    비상 이메일을 입력한 후 아이디찾기/비밀번호찾기를 클릭하면 비상 이메일로 아이디/비밀번호가 전송된다.

                </p>

                <div class="col-xs-6 col-md-4 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_id_pw_search.png">
                    </a>
                </div>
            </div>
            <div class="row">
                <h3 id="web-main-screen-4" class="userguide-page-sub-header">
                    3.4 회원정보 수정
                </h3>

                <p class="userguide-main-container-lead">
                    사용자는 로그인 후 우측 상단의 자신의 계정을 클릭하면 회원정보 수정 또는 회원탈퇴를 선택할 수 있다.
                    비밀번호 재입력을 통해 본인 확인을 거쳐 회원정보 수정 화면으로 접근할 수 있다.
                    비밀번호, 비상 이메일, 닉네임 등을 입력할 때는 회원가입과 동일한 조건을 가진다.

                </p>

                <div class="col-xs-6 col-md-4 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_pw_input.png">
                    </a>
                </div>
                <div class="col-xs-6 col-md-4 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_revise.png">
                    </a>
                </div>
            </div>
            <div class="row">
                <h3 id="web-main-screen-5" class="userguide-page-sub-header">
                    3.5 회원탈퇴
                </h3>

                <p class="userguide-main-container-lead">
                    사용자는 로그인 후 우측 상단의 아이디를 클릭하면 회원정보 수정 또는 회원탈퇴를 선택할 수 있다.
                    비밀번호 재입력을 통해 본인 확인을 거쳐 회원탈퇴 화면으로 접근할 수 있다.
                    회원탈퇴가 완료되면 탈퇴된 회원의 데이터는 데이터베이스에서 삭제된다.
                </p>

                <div class="col-xs-6 col-md-4 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_pw_input.png">
                    </a>
                </div>
                <div class="col-xs-6 col-md-4 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_member_leave.png">
                    </a>
                </div>
            </div>
            <h2 id="web-project-screen" class="userguide-page-header page-header">
                <a class="userguide-page-header">4. Web Project 화면</a>
            </h2>

            <h3 id="web-project-screen-1" class="userguide-page-sub-header">
                4.1 프로젝트 메인(Project Main)
            </h3>

            <p class="userguide-main-container-lead">
                사용자가 프로젝트 버튼을 눌러 프로젝트 화면으로 접속했을 때 처음 나타나는 화면으로 내 프로젝트 화면을 볼 수 있다.
            </p>

            <div class="row">
                <div class="col-xs-6 col-md-9 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_project_main_view.JPG">
                    </a>
                </div>
            </div>
            <h3 id="web-project-screen-2" class="userguide-page-sub-header">
                4.2 프로젝트 익스플로러(Project Explorer)
            </h3>

            <p class="userguide-main-container-lead">
                프로젝트 화면 좌측에 내 프로젝트 및 공유 프로젝트를 볼 수 있다.
                폴더 아이콘으로 표시된 프로젝트 및 폴더의 이름을 클릭했을 때 하위 폴더를 볼 수 있으며 이 때 폴더 아이콘이 변경된다.
            </p>

            <div class="row">
                <div class="col-xs-6 col-md-3 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_project_explorer.png">
                    </a>
                </div>
            </div>
            <div class="row">
                <h3 id="web-project-screen-3" class="userguide-page-sub-header">
                    4.3 프로젝트 컨텐츠 뷰(Project Contents View)
                </h3>

                <p class="userguide-main-container-lead">
                    파일/폴더들이 미리보기 형태로 나열되어있다.
                    미리보기 하단에는 파일/폴더의 복사, 삭제, 이름변경, 이동, 내보내기, 로그 등을 관리할 수 있는 설정과 파일/폴더의 이름 및 공유 폴더의 생성자를 확인할 수 있다.
                    파일의 경우 설정 아이콘 좌측에 댓글 아이콘이 위치하고, 폴더의 경우 공유 아이콘이 위치한다.
                </p>

                <div class="col-xs-6 col-md-8 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/project_contents_view.png">
                    </a>
                </div>
            </div>
            <div class="row">
                <ul>
                    <li class="list-title">
                        잠금
                    </li>
                    <p>공유 멤버가 파일을 수정중일 때 파일은 잠금 표시된다.</p>
                </ul>
                <div class="col-xs-6 col-md-3 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/project_file_lock.png">
                    </a>
                </div>
            </div>
            <div class="row">
                <ul>
                    <li class="list-title">
                        배경색 변경
                    </li>
                    <p>공유 멤버가 파일 수정을 완료 했을 때 파일/폴더의 하단 배경색이 변경된다. 공유 멤버의 수정으로 하단 배경색이 변경된 파일/폴더를 사용자가 확인하면 파일/폴더의 하단
                        배경색은 기본 색상으로 다시 변경된다.</p>
                </ul>
                <div class="col-xs-6 col-md-5 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/project_file_revise.png">
                    </a>
                </div>
            </div>
            <div class="row">
                <h4 id="web-project-screen-3-1" class="userguide-page-sub-header userguide-page-sub-sub-header">
                    4.3.1 공유/공유해제
                </h4>

                <div class="userguide-page-sub-sub-content">
                    <p class="userguide-main-container-lead">
                        공유 아이콘을 클릭하면 공유화면으로 접근할 수 있다. 아이디 입력란에 공유 멤버로 추가할 아이디를 입력한 후 추가 버튼을 클릭하면 공유 멤버가 추가된다.
                        입력한 아이디가 존재하지 않거나 이미 추가된 아이디라면 별도의 메시지를 통해 사용자에게 알리고 공유를 진행하지 않는다.
                        공유 화면의 아이디 입력란 하단에 위치한 공유 멤버 리스트에서 공유해제를 할 수 있다. 공유해제 아이콘을 클릭하면 공유해제 응답화면으로 접근할 수 있다.
                        공유해제 응답 화면에서 공유해제 여부를 선택할 수 있다.
                    </p>

                    <div class="col-xs-6 col-md-4 userguide-web-main-img list-title-end">
                        <a class="thumbnail">
                            <img src="${pageContext.request.contextPath}/img/main/userguide/project_share_view.JPG">
                        </a>
                    </div>
                </div>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <p class="userguide-main-container-lead">
                    공유가 완료되면 미리보기 좌측 상단에 공유 상태가 표시된다.
                </p>

                <div class="col-xs-6 col-md-5 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/share_before_after.png">
                    </a>
                </div>
            </div>
            <h4 id="web-project-screen-3-2" class="userguide-page-sub-header userguide-page-sub-sub-header">
                4.3.2 파일/폴더 설정
            </h4>

            <div class="userguide-page-sub-sub-content">
                <p class="userguide-main-container-lead">
                    단일 파일/폴더에 관한 설정을 할 수 있다. 복사, 삭제, 이름변경, 이동, 내보내기가 가능하고 파일의 경우 로그를 확인할 수 있다.
                </p>
                <ul>
                    <li class="list-title">
                        복사
                    </li>
                    <p>설정을 통해 복사 화면으로 접근할 수 있다. 복사할 경로에 같은 이름이 존재하면 이름을 변경한 후 복사할 수 있다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        삭제
                    </li>
                    <p>설정을 통해 삭제 응답 화면으로 접근할 수 있다. 삭제 응답 화면에서 삭제 여부를 선택할 수 있다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        이름변경
                    </li>
                    <p>설정을 통해 이름 변경 화면으로 접근할 수 있다. 동일한 이름이 존재할 경우 다른 이름을 입력해야 한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        이동
                    </li>
                    <p>설정을 통해 이동 화면으로 접근할 수 있다. 이동할 경로에 같은 이름이 존재하면 이름을 변경한 후 이동할 수 있다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        로그
                    </li>
                    <p>설정을 통해 로그를 클릭하면 우측 슬라이드바에 로그 화면이 나타난다. 파일 수정에 관한 내용이 기록되어 있으며 로그는 파일의 내용이 수정 될 때
                        수정한 날짜, 수정한 사용자의 닉네임, 수정한 내용을 포함한다. 로그 화면 상단에는 파일 보기, 파일 수정, 파일 저장이 있다.
                        사용자가 가장 최근에 확인한 시간 이후로 추가된 로그는 다른 색으로 표시된다. 사용자가 로그를 확인하면 기존 로그와 동일하게 변경된다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-3 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_project_log.png">
                    </a>
                </div>
            </div>

            <h4 id="web-project-screen-3-3" class="userguide-page-sub-header userguide-page-sub-sub-header">
                4.3.3 댓글
            </h4>

            <div class="row userguide-page-sub-sub-content">
                <p class="userguide-main-container-lead">
                    설정 아이콘 좌측에 위치한 아이콘을 클릭하면 우측 슬라이드바에 댓글창이 나타난다. 댓글 생성 및 수정, 삭제가 가능하다.
                    댓글 수정, 삭제는 본인이 작성한 댓글에 한해서 가능하다.
                </p>

                <div class="col-xs-6 col-md-3 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_project_comment.JPG">
                    </a>
                </div>
            </div>
            <h4 id="web-project-screen-3-4" class="userguide-page-sub-header userguide-page-sub-sub-header">
                4.3.4 상단 버튼
            </h4>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        체크박스 비활성화
                    </li>
                    <p class="list-title-end">우측 상단에 위치한 <span><img
                            src="${pageContext.request.contextPath}/img/main/userguide/web_project_checkbox.png"></span>
                        체크박스가 비활성화 되어있을 때 프로젝트 컨텐츠 뷰 상단 버튼은 생성과 가져오기 버튼이 위치한다.
                        파일/폴더를 생성할 수 있으며 가져오기 할 수 있다.</p>
                </ul>

                <ul>
                    <li class="list-title">
                        체크박스 활성화
                    </li>
                    <p>우측 상단에 위치한 체크박스를 활성화 하면 <span><img
                            src="${pageContext.request.contextPath}/img/main/userguide/web_project_checkbox_click.png"></span>
                        체크박스의 색상이 변경되고 파일/폴더의 미리보기 상단에도 체크박스가 생성된다. 프로젝트 컨텐츠 뷰 상단 버튼은 삭제, 이동, 복사, 내보내기 버튼이 위치한다.
                        선택된 파일/폴더에 대해 삭제, 이동, 복사, 내보내기 할 수 있다. 하지만 해당 파일/폴더에 대한 댓글, 공유, 설정을 할 수 없다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-4 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_project_checkbox_check.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        검색
                    </li>
                    <p>프로젝트 컨텐츠 뷰 우측 상단에 위치한 검색창을 통해 검색이 가능하다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-4 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/web_project_search.png">
                    </a>
                </div>
            </div>
            <h2 id="web-editor-screen" class="userguide-page-header page-header">
                <a class="userguide-page-header">5. Web Editor 화면</a>
            </h2>

            <h3 id="web-editor-screen-1" class="userguide-page-sub-header">
                5.1 도구모음
            </h3>

            <div class="row">
                <div class="col-xs-6 col-md-7 userguide-web-main-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/editor_tool_set.png">
                    </a>
                </div>
            </div>
            <ul>
                <li class="list-title">
                    저장하기
                </li>
                <p>현재 편집중인 파일을 저장한다. 현재 편집중인 파일이 이전에 저장되어 있는 파일일 경우 이어서 저장되고,
                    새 문서일 경우 파일의 저장 경로 및 이름을 설정한 후 저장할 수 있다.
                    <br>저장할 때는 파일과 함께 그에 해당하는 사진 파일도 함께 저장되며 이전에 저장된 사진 파일은 새로 저장된 사진 파일로 변경된다.
                </p>
            </ul>
            <ul>
                <li class="list-title">
                    새로 저장
                </li>
                <p>현재 편집중인 파일을 저장 경로와 이름을 재설정하여 새로운 파일로 저장한다.</p>
            </ul>
            <ul>
                <li class="list-title">
                    열기
                </li>
                <p>프로젝트에 위치한 파일을 불러온다.</p>
            </ul>
            <ul>
                <li class="list-title">
                    새 문서
                </li>
                <p>새 컨버스를 열어 새로운 파일을 만들 수 있다.</p>
            </ul>
            <ul>
                <li class="list-title">
                    되돌리기
                </li>
                <p>사용자가 가장 최근에 수행한 동작을 취소한다.</p>
            </ul>
            <ul>
                <li class="list-title">
                    다시실행
                </li>
                <p>사용자가 취소한 동작을 다시 실행한다.</p>
            </ul>
            <ul>
                <li class="list-title">
                    가져오기
                </li>
                <p>현재 로그인한 사용자의 컴퓨터에 위치한 wml, xmi 파일을 가져오기한다.</p>
            </ul>
            <ul>
                <li class="list-title">
                    내보내기
                </li>
                <p class="list-title-end">현재 편집중인 파일은 wml, xmi로 내보내기 된다.</p>
            </ul>
            <h3 id="web-editor-screen-2" class="userguide-page-sub-header">
                5.2 다이어그램별 도형목록
            </h3>

            <p class="userguide-main-container-lead">
                각 다이어그램을 작성할 수 있는 도형들의 목록이다. 캔버스 좌측에 위치하며 각 다이어그램의 이름을 클릭하면 도형들의 목록을 확인할 수 있다.
                도형의 사용은 드래그 앤 드롭으로 가능하다.
            </p>

            <div class="row">
                <div class="col-xs-6 col-md-3 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/editor_diagram_list.png">
                    </a>
                </div>
            </div>
            <h3 id="web-editor-screen-3" class="userguide-page-sub-header">
                5.3 캔버스
            </h3>

            <p class="userguide-main-container-lead">
                한 파일당 하나의 캔버스가 열린다.
            </p>

            <div class="row">
                <div class="col-xs-6 col-md-7 userguide-web-main-img list-title-end">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/editor_canvas.png">
                    </a>
                </div>
            </div>
            <h3 id="web-editor-screen-4" class="userguide-page-sub-header">
                5.4 로그 및 댓글
            </h3>

            <p class="userguide-main-container-lead list-title-end">
                현재 편집중인 파일에 대한 로그와 댓글들을 보여준다. 캔버스의 우측에 위치한다.
                프로젝트 화면에서의 로그 및 댓글 기능과 같고 로그의 경우 파일에 대한 내용 보기만 가능하다.
            </p>

            <h3 id="web-editor-screen-5" class="userguide-page-sub-header">
                5.5 속성
            </h3>

            <p class="userguide-main-container-lead list-title-end">
                선택된 도형에 대한 속성을 보여준다. 도형에 따라 속성창의 내용은 달라진다.
                도형의 기본적인 속성으로는 이름과 Stereotype이 있으며 도형에 따라 isAbstract, Abstract, Guardtype, Attribute, Method 등의
                속성을 갖는다. 선택적으로 Arguments, AssignmentTarget, Iteration을 입력할 수 있다.
            </p>

            <h2 id="diagram-modeling" class="userguide-page-header page-header">
                <a class="userguide-page-header">6. 다이어그램 모델링</a>
            </h2>

            <h3 id="diagram-modeling-1" class="userguide-page-sub-header">
                6.1 UseCase Diagram
            </h3>

            <h3 id="diagram-modeling-1-1" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.1.1 요소
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        도형
                    </li>
                    <p>- Actor</p>

                    <p>- UseCase</p>

                    <p>- System</p>

                    <p>- Package</p>
                </ul>
                <ul>
                    <li class="list-title">
                        관계
                    </li>
                    <p>- Association</p>

                    <p>- DirectedAssociation</p>

                    <p>- Generalization</p>

                    <p class="list-title-end">- Dependency</p>
                </ul>
            </div>

            <h3 id="diagram-modeling-1-2" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.1.2 Actor
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Actor 정의
                    </li>
                    <p>Actor는 일반적으로 시스템 외부에 존재하면서 시스템과 상호작용하는 개체를 뜻한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Actor 생성
                    </li>
                    <p>좌측 UseCase Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Actor도형을 드래그해 캔버스에 드롭한다.</p>

                </ul>
            </div>
            <ul>
                <div class="userguide-page-sub-sub-content">
                    <li class="list-title">
                        Actor 속성 설정
                    </li>
                    <p>캔버스에 드롭된 도형을 클릭하면 캔버스 우측 하단에 도형에 대한 속성창이 나타난다.
                        속성창에서 Actor의 이름과 Stereotype을 입력하고 isAbstract를 설정할 수 있다.
                        또한 캔버스에 드롭된 도형의 이름을 더블클릭하면 이름을 변경할 수 있다.</p>
                </div>
            </ul>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-3 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/actor_attribute_view.png">
                    </a>
                </div>
            </div>
            <ul>
                <div class="row userguide-page-sub-sub-content">
                    <li class="list-title">
                        Actor 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를선택한 후 Actor 도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 Actor 도형을 더블클릭하면더블클릭한 위치에 포트가 추가된다.</p>
                </div>
            </ul>
            <h3 id="diagram-modeling-1-3" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.1.3 UseCase
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        UseCase 정의
                    </li>
                    <p>시스템이 Actor에게 제공하는 사용자 관점의 기능단위를 뜻한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        UseCase 생성
                    </li>
                    <p>좌측 UseCase Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다. UseCase도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        UseCase 속성 설정
                    </li>
                    <p>캔버스에 드롭된 도형을 클릭하면 캔버스 우측 하단에 도형에 대한 속성창이 나타난다.
                        속성창에서UseCase의 이름과 Stereotype을 입력하고 isAbstract를 설정할 수 있다.
                        또한 캔버스에 드롭된 도형의 이름을 더블클릭하면 이름을 변경할 수 있다. </p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-3 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/usecase_attribute_view.png">
                    </a>
                </div>
            </div>
            <ul>
                <div class="row userguide-page-sub-sub-content">
                    <li class="list-title">
                        UseCase 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를선택한 후 UseCase도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 UseCase 도형을 더블클릭하면더블클릭한 위치에 포트가 추가된다. </p>

                </div>
            </ul>
            <h3 id="diagram-modeling-1-4" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.1.4 System
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        System 정의
                    </li>
                    <p>전체 시스템이 물리적으로 여러 개의 작은 시스템으로 구분될 때 구분된 시스템들을 효율적으로 관리하기 위한 요소이다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        System 생성
                    </li>
                    <p>좌측 UseCase Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다. System도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        System 속성 설정
                    </li>
                    <p>캔버스에 드롭된 도형을 클릭하면 캔버스 우측 하단에 도형에 대한 속성창이 나타난다.
                        속성창에서 System의 이름과 Stereotype을 입력할 수 있다.또한 캔버스에 드롭된 도형의 이름을 더블클릭하면 이름을 변경할 수 있다. </p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-3 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/usecase_package_attribute_view.png">
                    </a>
                </div>
            </div>
            <div class="list-title-end userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        System 포트추가
                    </li>
                    <p>캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 System 도형을클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 System 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다. </p>
                </ul>
            </div>
            <h3 id="diagram-modeling-1-5" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.1.5 Package
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Package 정의
                    </li>
                    <p>모델링 요소들을 논리적으로 그룹화하여 관리하기 위한 요소이다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Package 생성
                    </li>
                    <p>좌측 UseCase Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다. Package도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Package 속성 설정
                    </li>
                    <p>캔버스에 드롭된 도형을 클릭하면 캔버스 우측 하단에 도형에 대한 속성창이 나타난다.
                        속성창에서 Package의 이름과 Stereotype을 입력할 수 있다.
                        또한 캔버스에 드롭된 도형의 이름을 더블클릭하면 이름을 변경할 수 있다. </p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-3 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/usecase_package_attribute_view.png">
                    </a>
                </div>
            </div>
            <div class="list-title-end userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Package 포트추가
                    </li>
                    <p>캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 Package 도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 Package 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다. </p>
                </ul>
            </div>
            <h3 id="diagram-modeling-1-6" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.1.6 Association
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Association 정의
                    </li>
                    <P>일반적인 의미의 연결 관계이다.</P>
                </ul>
                <ul>
                    <li class="list-title">
                        Association 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다. 그 중 ‘Association’을 클릭하면 Association생성을 완료할 수 있다.
                        이미 연결되어있는 관계를 우클릭하면 연결선 변경을 할 수 있다. 이때 ‘Association’을 클릭하면 Association생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/usecase_association.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Association 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다. Editor화면에 출력된 이름 및 Stereotype, Guardtype을
                        더블클릭하면 수정이 가능하다.</p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-5 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/usecase_association_attribute_edit.png">
                    </a>
                </div>
            </div>
            <h3 id="diagram-modeling-1-7" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.1.7 DirectedAssociation
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        DirectedAssociation 정의
                    </li>
                    <p>일반적인 의미의 연결 관계이다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        DirectedAssociation 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다.
                        그 중 ‘DirectedAssociation’을 클릭하면 DirectedAssociation생성을 완료할 수 있다.
                        이미 연결되어있는 관계를 우클릭하면 연결선 변경을 할 수 있다. 이때 ‘DirectedAssociation’을 클릭하면 DirectedAssociation생성을 완료할 수
                        있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/usecase_directedassociation.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        DirectedAssociation 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정이 가능하다.</p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-5 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/usecase_directedassociation_attribute_edit.png">
                    </a>
                </div>
            </div>
            <h3 id="diagram-modeling-1-8" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.1.8 Generalization
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Generalization 정의
                    </li>
                    <p>상속을 나타내는 관계이다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Generalization 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다. 그 중 ‘Generalization’을 클릭하면 Generalization생성을 완료할 수 있다.
                        이미 연결되어있는 관계를 우클릭하면 연결선 변경을 할 수 있다. 이때 ‘Generalization’을 클릭하면 Generalization생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content ">
                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/usecase_generalization.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Generalization 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정 가능하다.</p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-5 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/usecase_generalization_attribute_edit.png">
                    </a>
                </div>
            </div>
            <h3 id="diagram-modeling-1-9" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.1.9 Dependency
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Dependency 정의
                    </li>
                    <p>요소간의 종속적인 관계를 표현한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Dependency 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다.
                        그 중 ‘Dependency’를 클릭하면 Dependency 생성을 완료할 수 있다.
                        이미 연결되어있는 관계를 우클릭하면 연결선 변경을 할 수 있다.
                        이때 ‘Dependency’을 클릭하면 Dependency 생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/usecase_dependency.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Dependency 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정 가능하다.</p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-5 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/usecase_dependency_attribute_edit.png">
                    </a>
                </div>
            </div>

            <h3 id="diagram-modeling-2" class="userguide-page-sub-header">
                6.2 Communication Diagram
            </h3>

            <h3 id="diagram-modeling-2-1" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.2.1 요소
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        도형
                    </li>
                    <p>- Communication Lifeline</p>
                </ul>
                <ul>
                    <li class="list-title">
                        관계
                    </li>
                    <p>- Send Message</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-2-2" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.2.2 Communication Lifeline
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Communication Lifeline 정의
                    </li>
                    <p>객체의 생존 기간을 의미한다.
                        Lifeline이 설정되어 있으면 객체는 메모리에 존재한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Communication Lifeline 생성
                    </li>
                    <p>좌측 Communication Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Communication Lifeline도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Communication Lifeline 속성 설정
                    </li>
                    <p>캔버스에 드롭된 도형을 클릭하면 캔버스 우측 하단에 도형에 대한 속성창이 나타난다.
                        속성창에서 Communication Lifeline의 이름과 Stereotype을 입력할 수 있다.
                        또한 캔버스에 드롭된 도형의 이름을 더블클릭하면 이름을 변경할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-3 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/communication_lifeline_attribute_view.png">
                    </a>
                </div>
            </div>
            <div class="list-title-end userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Communication Lifeline 포트추가
                    </li>
                    <p>캔버스에 드롭된 도형을 우클릭하여 ‘포트추가’를 선택 한 후 Communication Lifeline도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 Communication Lifeline 도형을 클릭하면 더블클릭한 위치에 포트가 추가된다.</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-2-3" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.2.3 Send Message
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Send Message 정의
                    </li>
                    <p>객체 간에 주고받는 메시지를 표현한다. 숫자를 이용해 메시지의 순서를 나타낸다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Send Message 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다. 그 중 ‘Send Message’를 클릭하면 Send Message 생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-5 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/sendmessage.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Send Message 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정 가능하다.
                        Arguments, AssignmentTarget, Iteration 속성은 이름에 포함하여 변경한다. </p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-7 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/sendmessage_attribute_edit.png">
                    </a>
                </div>
            </div>
            <h3 id="diagram-modeling-3" class="userguide-page-sub-header">
                6.3 Activity Diagram
            </h3>

            <h3 id="diagram-modeling-3-1" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.3.1 요소
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        도형
                    </li>
                    <p>- Initial</p>

                    <p>- Final</p>

                    <p>- Activity</p>

                    <p>- Swimlane</p>

                    <p>- Choice</p>

                    <p>- Fork and Join(Vertical)</p>

                    <p>- Fork and Join(Horizontal)</p>
                </ul>
                <ul>
                    <li class="list-title">
                        관계
                    </li>
                    <p class="list-title-end">- Arrow Connection</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-3-2" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.3.2 Initial
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Initial 정의
                    </li>
                    <p>Activity Diagram에서 시작점을 의미한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Initial 생성
                    </li>
                    <p>좌측 Activity Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Initial도형을 드래그해 캔버스에 드롭한다.</p>

                </ul>
                <ul>
                    <li class="list-title">
                        Initial 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 Initial 도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 Initial 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다.</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-3-3" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.3.3 Final
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Final 정의
                    </li>
                    <p>Activity Diagram에서 종료점을 의미한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Final 생성
                    </li>
                    <p>좌측 Activity Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Final도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Final 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 Final 도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 Final 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다. </p>
                </ul>
            </div>
            <h3 id="diagram-modeling-3-4" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.3.4 Activity
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Activity 정의
                    </li>
                    <p>처리 과정 중 각 단계별로 행해지는 활동을 말한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Acivity 생성
                    </li>
                    <p>좌측 Activity Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Activity도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Activity 속성 설정
                    </li>
                    <p>캔버스에 드롭된 도형을 클릭하면 캔버스 우측 하단에 도형에 대한 속성창이 나타난다.
                        속성창에서 Activity의 이름과 Stereotype을 입력할 수 있다.
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-3 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/activity_attribute_view.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Activity 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 Acivity 도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 Activity 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다.</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-3-5" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.3.5 Swimlane
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Swimlane 정의
                    </li>
                    <p>처리 과정 중에 발생하는 각 활동의 책임이 누구에게 있는지를 나타낸다.
                        Swimlane은 사람이 될 수도 있고 시스템이 될 수도 있다.
                        각 활동을 수행하는 주체이기만 하면 된다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Swimlane 생성
                    </li>
                    <p>좌측 Activity Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Swimlane도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Swimlane 속성 설정
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 클릭하면 캔버스 우측 하단에 도형에 대한 속성창이 나타난다.
                        속성창에서 Swimlane의 이름을 입력할 수 있다.
                        또한 캔버스에 드롭된 도형의 이름을 더블클릭하면 이름을 변경할 수 있다. </p>
                </ul>
            </div>
            <h3 id="diagram-modeling-3-6" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.3.6 Choice
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Choice 정의
                    </li>
                    <p>조건에 의해 분기되는 지점을 말한다.
                        조건에 의해 처리 경로가 분기되며 조건은 분기된 화살표에 대괄호([])로 감싸서 표시한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Choice 생성
                    </li>
                    <p>좌측 Activity Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Choice도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Choice 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 Choice 도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 Choice 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다.</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-3-7" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.3.7 Fork and Join(Vertical)
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Fork and Join(Vertical) 정의
                    </li>
                    <p>처리과정 중 특정 활동이 동시에 같이 실행되다가 하나로 모이는 경우, 여러 활동이 다시 하나로 합쳐질 경우에 사용된다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Fork and Join(Vertical) 생성
                    </li>
                    <p>좌측 Activity Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다. Fork and Join(Vertical)도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Fork and Join(Vertical) 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 Fork and Join(Vertical) 도형을 클릭하면 클릭한 위치에
                        포트가 추가된다.
                        또한 Fork and Join(Vertical) 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다.</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-3-8" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.3.8 Fork and Join(Horizontal)
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Fork and Join(Horizontal) 정의
                    </li>
                    <p>처리과정 중 특정 활동이 동시에 같이 실행되다가 하나로 모이는 경우, 여러 활동이 다시 하나로 합쳐질 경우에 사용된다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Fork and Join(Horizontal) 생성
                    </li>
                    <p>좌측 Activity Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다. Fork and Join(Horizontal)도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Fork and Join(Horizontal) 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 Fork and Join(Horizontal) 도형을 클릭하면 클릭한 위치에
                        포트가 추가된다.
                        또한 Fork and Join(Horizontal) 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다.</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-3-9" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.3.9 Arrow Connection
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Arrow Connection 정의
                    </li>
                    <p>진행 과정(방향)을 나타낸다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Arrow Connection 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다.
                        그 중 ‘Arrow Connection’를 클릭하면 Arrow Connection 생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/activity_arrowconnection.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Arrow Connection 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정 가능하다.</p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/activity_arrowconnection_attribute_edit.png">
                    </a>
                </div>
            </div>
            <h3 id="diagram-modeling-4" class="userguide-page-sub-header">
                6.4 Statechart Diagram
            </h3>

            <h3 id="diagram-modeling-4-1" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.4.1 요소
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        도형
                    </li>
                    <p>- Initial</p>

                    <p>- Final</p>

                    <p>- State</p>

                    <p>- Choice</p>

                    <p>- Fork and Join(Vertical)</p>

                    <p>- Fork and Join(Horizontal)</p>
                </ul>
                <ul>
                    <li class="list-title">
                        관계
                    </li>
                    <p class="list-title-end">- Arrow Connection</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-4-2" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.4.2 Initial
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Initial 정의
                    </li>
                    <p>Statechart Diagram에서 시작점을 의미한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Initial 생성
                    </li>
                    <p>좌측 Statechart Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다. Initial 도형을 드래그해 캔버스에 드롭한다.</p>

                </ul>
                <ul>
                    <li class="list-title">
                        Initial 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 Initial 도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 Initial 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다.</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-4-3" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.4.3 Final
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Final 정의
                    </li>
                    <p>Statechart Diagram에서 종료점을 의미한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Final 생성
                    </li>
                    <p>좌측 Statechart Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Final 도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Final 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 Final 도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 Final 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다. </p>
                </ul>
            </div>
            <h3 id="diagram-modeling-4-4" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.4.4 State
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        State 정의
                    </li>
                    <p>객체의 상태를 의미한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        State 생성
                    </li>
                    <p>좌측 Statechart Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        State도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        State 속성 설정
                    </li>
                    <p>캔버스에 드롭된 도형을 클릭하면 캔버스 우측 하단에 도형에 대한 속성창이 나타난다.
                        속성창에서 State의 이름과 Stereotype을 입력할 수 있다.
                        또한 캔버스에 드롭된 도형의 이름을 더블클릭하면 이름을 변경할 수 있다. <br>
                        State의 Attribute는 속성창에서 설정 가능하다.
                        State의 action을 설정하고 Method를 입력할 수 있다.
                        State의 action의 경우 [entry/do/exit] 중 선택 가능하다.
                        Method는 이름변경과 동일하게 캔버스에 드롭된 도형을 더블클릭하면 변경할 수 있다.
                        State의 Attribute는 캔버스 우측 하단의 속상창에서 추가 혹은 삭제가 가능하다. </p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-3 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/state_attribute_view.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        State 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 State 도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 State 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다.</p>

                </ul>
            </div>
            <h3 id="diagram-modeling-4-5" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.4.5 Choice
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Choice 정의
                    </li>
                    <p>조건에 의해 분기되는 지점을 말한다.
                        조건에 의해 처리 경로가 분기되며 조건은 분기된 화살표에 대괄호([])로 감싸서 표시한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Choice 생성
                    </li>
                    <p>좌측 Statechart Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Choice도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Choice 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 Choice 도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 Choice 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다.</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-4-6" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.4.6 Fork and Join(Vertical)
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Fork and Join(Vertical) 정의
                    </li>
                    <p>처리과정 중 특정 활동이 동시에 같이 실행되다가 하나로 모이는 경우, 여러 활동이 다시 하나로 합쳐질 경우에 사용된다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Fork and Join(Vertical) 생성
                    </li>
                    <p>좌측 Statechart Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Fork and Join(Vertical)도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Fork and Join(Vertical) 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 Fork and Join(Vertical) 도형을 클릭하면 클릭한 위치에
                        포트가 추가된다.
                        또한 Fork and Join(Vertical) 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다.</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-4-7" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.4.7 Fork and Join(Horizontal)
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Fork and Join(Horizontal) 정의
                    </li>
                    <p>처리과정 중 특정 활동이 동시에 같이 실행되다가 하나로 모이는 경우, 여러 활동이 다시 하나로 합쳐질 경우에 사용된다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Fork and Join(Horizontal) 생성
                    </li>
                    <p>좌측 Statechart Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Fork and Join(Horizontal)도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Fork and Join(Horizontal) 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여‘포트추가’를 선택한 후 Fork and Join(Horizontal) 도형을 클릭하면 클릭한 위치에
                        포트가 추가된다.
                        또한 Fork and Join(Horizontal) 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다.</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-4-8" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.4.8 Arrow Connection
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Arrow Connection 정의
                    </li>
                    <p>진행 과정(방향)을 나타낸다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Arrow Connection 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다.
                        그 중 ‘Arrow Connection’를 클릭하면 Arrow Connection 생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/arrowconnection.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Arrow Connection 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정 가능하다.</p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/arrowconnection_attribute_edit.png">
                    </a>
                </div>
            </div>
            <h3 id="diagram-modeling-5" class="userguide-page-sub-header">
                6.5 Class Diagram
            </h3>

            <h3 id="diagram-modeling-5-1" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.5.1 요소
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        도형
                    </li>
                    <p>- Class</p>

                    <p>- Package</p>
                </ul>
                <ul>
                    <li class="list-title">
                        관계
                    </li>
                    <p>- Association</p>

                    <p>- DirectedAssociation</p>

                    <p>- Aggregation</p>

                    <p>- Composition</p>

                    <p>- Generalization</p>

                    <p class="list-title-end">- Dependency</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-5-2" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.5.2 Class
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Class 정의
                    </li>
                    <p>객체지향의 설계 단위이다. Class를 이용해 시스템의 정적인 모델을 표현한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Class 생성
                    </li>
                    <p>좌측 Class Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Class도형을 드래그해 캔버스에 드롭한다.</p>

                </ul>
                <ul>
                    <li class="list-title">
                        Class 속성설정
                    </li>
                    <p>캔버스에 드롭된 도형을 클릭하면 캔버스 우측 하단에 도형에 대한 속성창이 나타난다.
                        속성창에서 Class의 이름과 Stereotype을 입력하고 isAbstract를 설정할 수 있다.
                        또한 캔버스에 드롭된 도형의 이름을 더블클릭하면 이름을 변경할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/class_attribute_view.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Class Attribute 및 Method
                    </li>
                    <p>Class의 Attribute는 속성창에서 설정 가능하다.
                        Attribute와 Method는 가시성[public/protected/private/package]을 설정할 수 있다.
                        또한 Attribute는 Static을, Method는 Static, Abstract를 설정하고 이름을 변경할 수 있다.
                        Attribute 또는 Method에 Static을 설정하면 캔버스에 드롭된 도형의 Attribute 또는 Method에 밑줄이 표시되고, Method에 Abstract를
                        설정하면 캔버스에 드롭된 도형의 Method가 기울림꼴로 표시된다.
                        또한 Attribute와 Method는 버튼을 통해 추가 혹은 삭제가 가능하다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/class_attribute_method.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Class 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여 ‘포트추가’를 선택한 후 Class 도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 Class 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다.</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-5-3" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.5.3 Package
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Package 정의
                    </li>
                    <p>모델링 요소들을 논리적으로 그룹화하여 관리하기 위한 요소이다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Package 생성
                    </li>
                    <p>좌측 Class Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Package도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Package 속성설정
                    </li>
                    <p>캔버스에 드롭된 도형을 클릭하면 캔버스 우측 하단에 도형에 대한 속성창이 나타난다.
                        속성창에서 Package의 이름과 Stereotype을 입력할 수 있다.
                        또한 캔버스에 드롭된 도형의 이름을 더블클릭하면 이름을 변경할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-3 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/class_package_attribute_view.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Package 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여 ‘포트추가’를 선택한 후 Package 도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                        또한 Package 도형을 더블클릭하면 더블클릭한 위치에 포트가 추가된다. </p>
                </ul>
            </div>
            <h3 id="diagram-modeling-5-4" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.5.4 Association
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Association 정의
                    </li>
                    <p>일반적인 의미의 연결 관계이다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Association 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다.
                        그 중 ‘Association’을 클릭하면 Association생성을 완료할 수 있다.
                        이미 연결되어있는 관계를 우클릭하면 연결선 변경을 할 수 있다.
                        이때 ‘Association’을 클릭하면 Association생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-5 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/association.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Association 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정이 가능하다. </p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-6 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/association_attribute_edit.png">
                    </a>
                </div>
            </div>
            <h3 id="diagram-modeling-5-5" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.5.5 Directed Association
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        DirectedAssociation 정의
                    </li>
                    <p>일반적인 의미의 연결 관계이다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        DirectedAssociation 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다.
                        그 중 ‘DirectedAssociation’을 클릭하면 DirectedAssociation생성을 완료할 수 있다.
                        이미 연결되어있는 관계를 우클릭하면 연결선 변경을 할 수 있다.
                        이때 ‘DirectedAssociation’을 클릭하면 DirectedAssociation생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-5 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/directedassociation.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        DirectedAssociation 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정 가능하다.</p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-6 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/directedassociation_attribute_edit.png">
                    </a>
                </div>
            </div>
            <h3 id="diagram-modeling-5-6" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.5.6 Aggregation
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Aggregation 정의
                    </li>
                    <p>전체와 부분을 나타내는 집합관계이다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Aggregation 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다.
                        그 중 ‘Aggregation’을 클릭하면 Aggregation생성을 완료할 수 있다.
                        이미 연결되어있는 관계를 우클릭하면 연결선 변경을 할 수 있다.
                        이때 ‘Aggregation’을 클릭하면 Aggregation생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-5 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/aggregation.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Aggregation 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정 가능하다.</p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-6 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/aggregation_attribute_edit.png">
                    </a>
                </div>
            </div>
            <h3 id="diagram-modeling-5-7" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.5.7 Composition
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Composition 정의
                    </li>
                    <p>Association관계의 일종으로 부분과 전체의 관계이다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Composition 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다.
                        그 중 ‘Composition’을 클릭하면 Composition생성을 완료할 수 있다.
                        이미 연결되어있는 관계를 우클릭하면 연결선 변경을 할 수 있다.
                        이때 ‘Composition’을 클릭하면 Composition생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-5 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/composition.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Composition 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정 가능하다.</p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-6 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/composition_attribute_edit.png">
                    </a>
                </div>
            </div>
            <h3 id="diagram-modeling-5-8" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.5.8 Generalization
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Generalization 정의
                    </li>
                    <p>상속을 나타내는 관계이다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Generalization 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다.
                        그 중 ‘Generalization’을 클릭하면 Generalization생성을 완료할 수 있다.
                        이미 연결되어있는 관계를 우클릭하면 연결선 변경을 할 수 있다.
                        이때 ‘Generalization’을 클릭하면 Generalization생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-5 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/generalization.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Generalization 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정 가능하다.</p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-6 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/generalization_attribute_edit.png">
                    </a>
                </div>
            </div>
            <h3 id="diagram-modeling-5-9" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.5.9 Dependency
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Dependency 정의
                    </li>
                    <p>요소간의 종속적인 관계를 표현한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Dependency 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다.
                        그 중 ‘Dependency’를 클릭하면 Dependency 생성을 완료할 수 있다.
                        이미 연결되어있는 관계를 우클릭하면 연결선 변경을 할 수 있다.
                        이때 ‘Dependency’을 클릭하면 Dependency 생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-5 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/class_dependency.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Dependency 이름 설정 및 Stereotype, Guardtype
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정 가능하다.</p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-6 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/dependency_attribute_edit.png">
                    </a>
                </div>
            </div>
            <h3 id="diagram-modeling-6" class="userguide-page-sub-header">
                6.6 Sequence Diagram
            </h3>

            <h3 id="diagram-modeling-6-1" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.6.1 요소
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        도형
                    </li>
                    <p>- Sequence Lifeline</p>

                    <p>- Package</p>
                </ul>
                <ul>
                    <li class="list-title">
                        관계
                    </li>
                    <p>- Message</p>

                    <p>- Reply Message</p>

                    <p class="list-title-end">- Dependency</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-6-2" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.6.2 Sequence Lifeline
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Sequence Lifeline 정의
                    </li>
                    <p>객체의 생존 기간을 나타내며 시간에 따른 객체의 존재를 보여준다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Sequence Lifeline 생성
                    </li>
                    <p>좌측 Sequence Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Sequence Lifeline도형을 드래그해 캔버스에 드롭한다.</p>

                </ul>
                <ul>
                    <li class="list-title">
                        Sequence Lifeline 속성설정
                    </li>
                    <p>캔버스에 드롭된 도형을 클릭하면 캔버스 우측 하단에 도형에 대한 속성창이 나타난다.
                        속성창에서 Sequence Lifeline의 이름과 Stereotype을 입력할 수 있다.
                        또한 캔버스에 드롭된 도형의 이름을 더블클릭하면 이름을 변경할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-3 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/sequence_lifeline_attribute_view.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Sequence Lifeline 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 Sequence Lifeline 도형을 드롭하면 포트가 추가된 상태로 드롭된다.</p>
                </ul>
            </div>
            <h3 id="diagram-modeling-6-3" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.6.3 Package
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Package 정의
                    </li>
                    <p>모델링 요소들을 논리적으로 그룹화하여 관리하기 위한 요소이다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Package 생성
                    </li>
                    <p>좌측 Sequence Diagram 버튼을 클릭해 도형 리스트를 활성화 시킨다.
                        Package도형을 드래그해 캔버스에 드롭한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Package 속성설정
                    </li>
                    <p>캔버스에 드롭된 도형을 클릭하면 캔버스 우측 하단에 도형에 대한 속성창이 나타난다.
                        속성창에서 Package의 이름과 Stereotype을 입력할 수 있다.
                        또한 캔버스에 드롭된 도형의 이름을 더블클릭하면 이름을 변경할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-3 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/package_attribute_view.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Package 포트추가
                    </li>
                    <p class="list-title-end">캔버스에 드롭된 도형을 우클릭하여 ‘포트추가’를 선택한 후 Package 도형을 클릭하면 클릭한 위치에 포트가 추가된다.
                </ul>
            </div>
            <h3 id="diagram-modeling-6-4" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.6.4 Message
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Message 정의
                    </li>
                    <p>객체간의 상호작용을 나타낸다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Message 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다.
                        그 중 ‘Message’를 클릭하면 Message 생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/message.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Message 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정 가능하다.
                        Arguments, AssignmentTarget, Iteration 속성은 이름에 포함하여 변경한다. </p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-7 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/message_attribute_view.png">
                    </a>
                </div>
            </div>
            >
            <h3 id="diagram-modeling-6-5" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.6.5 Reply Message
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Reply Message 정의
                    </li>
                    <p>반환값을 표시하기 위한 메시지이다. 선택적으로 사용된다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Reply Message 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다.
                        그 중 ‘Reply Message’를 클릭하면 Reply Message 생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">
                <div class="col-xs-6 col-md-4 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/reply_message.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Reply Message 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정 가능하다.
                        Arguments, AssignmentTarget, Iteration 속성은 이름에 포함하여 변경한다.</p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-7 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/reply_attribute_view.png">
                    </a>
                </div>
            </div>
            <h3 id="diagram-modeling-6-6" class="userguide-page-sub-header userguide-page-sub-sub-header">
                6.6.6 Dependency
            </h3>

            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Dependency 정의
                    </li>
                    <p>요소간의 종속적인 관계를 표현한다.</p>
                </ul>
                <ul>
                    <li class="list-title">
                        Dependency 생성
                    </li>
                    <p>두 도형의 포트를 연결하면 관계 리스트를 볼 수 있다.
                        그 중 ‘Dependency’를 클릭하면 Dependency 생성을 완료할 수 있다.</p>
                </ul>
            </div>
            <div class="row userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-6 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/dependency.png">
                    </a>
                </div>
            </div>
            <div class="userguide-page-sub-sub-content">
                <ul>
                    <li class="list-title">
                        Dependency 속성 설정
                    </li>
                    <p>관계를 클릭한 후 우측 하단의 속성창에서 이름 및 Stereotype, Guardtype을 입력한 후 ‘Enter’키를 누르면 입력이 완료된다.
                        입력이 완료된 이름 및 Stereotype, Guardtype은 Editor화면에 출력된다.
                        Editor화면에 출력된 이름 및 Stereotype, Guardtype을 더블클릭하면 수정 가능하다.</p>
                </ul>
            </div>
            <div class="row list-title-end userguide-page-sub-sub-content">

                <div class="col-xs-6 col-md-6 userguide-web-img">
                    <a class="thumbnail">
                        <img src="${pageContext.request.contextPath}/img/main/userguide/diagram/dependency_attribute_view.png">
                    </a>
                </div>
            </div>
            <h2 id="file-folder-delete-recovery" class="userguide-page-header page-header">
                <a class="userguide-page-header">7. 파일/폴더 삭제 및 복구</a>
            </h2>

            <h3 id="file-folder-delete-recovery-1" class="userguide-page-sub-header">
                7.1 파일/폴더 삭제
            </h3>

            <p class="userguide-main-container-lead list-title-end">
                하나 이상의 파일/폴더를 선택하여 삭제한다.
            </p>

            <div class="row">
                <h3 id="file-folder-delete-recovery-2" class="userguide-page-sub-header">
                    7.2 휴지통에서의 파일/폴더 되살리기
                </h3>

                <div class="row">
                    <h4 id="file-folder-delete-recovery-2-1"
                        class="userguide-page-sub-header userguide-page-sub-sub-header">
                        7.2.1 단일 파일/폴더 되살리기
                    </h4>

                    <div class="userguide-page-sub-sub-content">
                        <p class="userguide-main-container-lead">
                            사용자가 하나의 파일/폴더만 되살리기 원하는 경우 해당 파일/폴더는 이전 경로에 되살리기 된다. 만약 이전 경로에 되살릴 파일/폴더와 동일한
                            이름의 파일/폴더가 존재한다면 사용자는 되살릴 파일/폴더의 이름을 재입력 해주어야 한다.
                        </p>
                    </div>
                </div>
                <div class="row">
                    <h4 id="file-folder-delete-recovery-2-2"
                        class="userguide-page-sub-header userguide-page-sub-sub-header">
                        7.2.2 다중 파일/폴더 되살리기
                    </h4>

                    <div class="userguide-page-sub-sub-content list-title-end">
                        <p class="userguide-main-container-lead">
                            사용자가 여러 파일/폴더들을 되살리기 원하는 경우 해당 파일/폴더들은 이전 경로에 되살리기 된다. 만약 이전 경로에 되살릴 파일/폴더들과 동일한
                            이름의 파일/폴더가 하나라도 존재한다면 선택된 파일/폴더들의 되살리기는 전체 취소된다.
                        </p>
                    </div>
                </div>
            </div>

            <div class="row">
                <h3 id="file-folder-delete-recovery-3" class="userguide-page-sub-header">
                    7.3 휴지통 비우기
                </h3>

                <div class="row">
                    <h4 id="file-folder-delete-recovery-3-1"
                        class="userguide-page-sub-header userguide-page-sub-sub-header">
                        7.3.1 휴지통 화면에서 휴지통 비우기
                    </h4>

                    <div class="userguide-page-sub-sub-content">
                        <p class="userguide-main-container-lead">
                            프로젝트 화면에서 좌측 하단에 위치한 휴지통 버튼을 클릭하면 휴지통 화면으로 접근할 수 있다. 휴지통 화면 내에서 휴지통 비우기 버튼을 클릭하면
                            휴지통 비우기가 가능하다.
                        </p>
                    </div>
                </div>
                <div class="row">
                    <h4 id="file-folder-delete-recovery-3-2"
                        class="userguide-page-sub-header userguide-page-sub-sub-header">
                        7.3.2 프로젝트 화면에서 휴지통 비우기
                    </h4>

                    <div class="userguide-page-sub-sub-content">
                        <p class="userguide-main-container-lead">
                            프로젝트 화면에서 좌측 하단에 위치한 휴지통 버튼 중 우측에 위치한 회색 휴지통을 클릭하면 휴지통 화면에 접근할 필요 없이 바로 휴지통 비우기가
                            가능하다. 휴지통 내부 파일/폴더 존재 유무에 따라 해당 휴지통 버튼의 이미지가 변경된다.
                        </p>
                    </div>
                    <div class="userguide-page-sub-sub-content">
                        <div class="col-xs-1 col-md-2 userguide-web-main-img list-title-end">
                            <a class="thumbnail">
                                <img src="${pageContext.request.contextPath}/img/main/userguide/web_trash_vacant.png">
                            </a>
                        </div>
                        <div class="col-xs-1 col-md-2 userguide-web-main-img list-title-end">
                            <a class="thumbnail">
                                <img src="${pageContext.request.contextPath}/img/main/userguide/web_trash_full.png">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</div>
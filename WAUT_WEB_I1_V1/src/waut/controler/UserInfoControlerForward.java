package waut.controler;

import java.io.IOException;
import java.util.Random;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import waut.bean.UserInfoBean;

public class UserInfoControlerForward extends ControlerForward {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static final String REQ_ACTION = "action";

	private static final String ACTION_MOVE_INDEX = "indexPage";
	private static final String ACTION_MOVE_USERGUIDE = "userguidePage";
	private static final String ACTION_MOVE_LOGIN = "loginPage";
	private static final String ACTION_MOVE_JOIN = "joinPage";
	private static final String ACTION_MOVE_INPUTPASSWORD = "inputPasswordPage";
	private static final String ACTION_MOVE_IDPWSEARCH = "idPwSearchPage";

	private static final String ACTION_CHECK_ID = "checkId";
	private static final String ACTION_CHECK_EMERGENCYEMAIL = "checkEmergencyEmail";
	private static final String ACTION_CHECK_PW = "checkPw";

	private static final String ACTION_SEND_PASSNUM = "sendPassNum";
	private static final String ACTION_LOGIN = "login";
	private static final String ACTION_LOGOUT = "logout";
	private static final String ACTION_JOIN = "join";
	private static final String ACTION_MODIFY = "modify";
	private static final String ACTION_LEAVE = "leave";
	private static final String ACTION_SEARCH_ID = "searchId";
	private static final String ACTION_SEARCH_PW = "searchPw";

	private UserInfoControler userInfoControler = new UserInfoControler();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		String action = request.getParameter(REQ_ACTION);
		String viewPath = "/jsp/view.jsp";

		HttpSession session = request.getSession(false);

		if (action == null)
			return;

		// 메인 인덱스 화면 이동
		if (action.equals(ACTION_MOVE_INDEX)) {
			setMovePage("index_view.jsp", request);

			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);

			// 로그인 화면 이동
		} else if (action.equals(ACTION_MOVE_LOGIN)) {
			setMovePage("login_view.jsp", request);
			request.setAttribute("result", true);

			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);

			// 회원가입 화면 이동
		} else if (action.equals(ACTION_MOVE_JOIN)) {
			setMovePage("join_view.jsp", request);
			request.setAttribute("result", true);

			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);

			// 아이디 비밀번호 찾기 화면 이동
		} else if (action.equals(ACTION_MOVE_IDPWSEARCH)) {
			setMovePage("id_pw_search_view.jsp", request);

			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);

			// 비밀번호 입력 페이지 이동
		} else if (action.equals(ACTION_MOVE_INPUTPASSWORD)) {

			if (session.getAttribute("id") != null) {
				String nextPage = request.getParameter("nextPage");

				setMovePage("input_password_view.jsp", request);

				request.setAttribute("result", true);
				request.setAttribute("nextPage", nextPage);
			} else {
				setMovePage("index_view.jsp", request);
			}

			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);

			// 로그인
		} else if (action.equals(ACTION_MOVE_USERGUIDE)) {
			setMovePage("userguide_view.jsp", request);

			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);

			// 로그인
		} else if (action.equals(ACTION_LOGIN)) {

			String targetId = request.getParameter("id");
			String targetPw = request.getParameter("pw");

			UserInfoBean userinfoBean = userInfoControler.login(targetId, targetPw);

			if (userinfoBean != null) {

				session.setAttribute("id", userinfoBean.getId());
				session.setAttribute("name", userinfoBean.getName());
				session.setAttribute("email", userinfoBean.getEmail());

				setMovePage("index_view.jsp", request);
			} else {
				setMovePage("login_view.jsp", request);

				request.setAttribute("result", false);
			}

			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);

			// 로그아웃
		} else if (action.equals(ACTION_LOGOUT)) {
			session.invalidate();

			setMovePage("index_view.jsp", request);

			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);

			// 회원 가입
		} else if (action.equals(ACTION_JOIN)) {
			String targetId = request.getParameter("id");
			String targetPw = request.getParameter("pw");
			String targetEmergencyEmail = request.getParameter("emergencyEmail");
			String targetName = request.getParameter("name");

			boolean result = userInfoControler.join(targetId, targetPw, targetEmergencyEmail, targetName);

			if (result) {
				setMovePage("index_view.jsp", request);
			} else
				System.out.println("insert error!!");

			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);

			// 아이디 확인
		} else if (action.equals(ACTION_CHECK_ID)) {

			String targetId = request.getParameter("id");

			boolean result = userInfoControler.checkID(targetId);

			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(result);

			// 인증번호 전송
		} else if (action.equals(ACTION_SEND_PASSNUM)) {
			String targetId = request.getParameter("id");
			int passNum = new Random().nextInt(10000);

			// 이메일 보냄.
			Mailer.send(targetId, "drawUML 인증번호 발송 메일입니다.", "인증번호 : " + Integer.toString(passNum));

			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(passNum);

			// 비상 이메일 확인
		} else if (action.equals(ACTION_CHECK_EMERGENCYEMAIL)) {
			String targetEmergencyEmail = request.getParameter("emergencyEmail");

			boolean result = userInfoControler.checkEmergencyEmail(targetEmergencyEmail);

			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(result);

			// 비밀번호 확인 화면
		} else if (action.equals(ACTION_CHECK_PW)) {

			// session이 없으면 인덱스화면으로 이동
			if (session.getAttribute("id") != null) {
				String nextPage = request.getParameter("nextPage");
				String targetPw = request.getParameter("pw");

				String targetId = (String) session.getAttribute("id");

				UserInfoBean userinfoBean = userInfoControler.login(targetId, targetPw);

				if (userinfoBean != null) {
					if (nextPage.equals("userModify"))
						setMovePage("user_modify_view.jsp", request);
					else {
						setMovePage("user_leave_view.jsp", request);
						request.setAttribute("result", true);
					}
				} else {
					setMovePage("input_password_view.jsp", request);
					request.setAttribute("result", false);
					request.setAttribute("nextPage", nextPage);
				}
			} else
				setMovePage("index_view.jsp", request);
			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);

			// 회원정보 수정
		} else if (action.equals(ACTION_MODIFY)) {
			String targetId = request.getParameter("id");
			String targetPw = request.getParameter("pw");
			String targetEmergencyEmail = request.getParameter("emergencyEmail");
			String targetName = request.getParameter("name");

			if (userInfoControler.modify(targetId, targetPw, targetEmergencyEmail, targetName)) {
				session.setAttribute("name", targetName);
				session.setAttribute("email", targetEmergencyEmail);

				setMovePage("index_view.jsp", request);
			} else {
				System.out.println("update fail!!");
			}

			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);

			// 회원탈퇴
		} else if (action.equals(ACTION_LEAVE)) {
			String targetPw = request.getParameter("pw");

			String targetId = (String) session.getAttribute("id");

			UserInfoBean userinfoBean = userInfoControler.login(targetId, targetPw);

			if (userinfoBean != null) {
				if (userInfoControler.leave(targetId)) {
					session.invalidate();

					setMovePage("index_view.jsp", request);
				} else
					System.out.println("delete error!!");
			} else {
				setMovePage("user_leave_view.jsp", request);
				request.setAttribute("result", false);
			}
			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);

			// 아이디 찾기
		} else if (action.equals(ACTION_SEARCH_ID)) {
			String targetEmergencyEmail = request.getParameter("email");

			UserInfoBean userinfoBean = userInfoControler.getUserInfoByEmergencyEmail(targetEmergencyEmail);

			if (userinfoBean != null) {
				// 이메일 보냄.
				Mailer.send(targetEmergencyEmail, "drawUML 아이디 발송 메일입니다.",
						"당신의 아이디는 " + userinfoBean.getId() + " 입니다.");

				setMovePage("id_pw_search_view.jsp", request);
				request.setAttribute("result", true);
			} else {
				setMovePage("id_pw_search_view.jsp", request);
				request.setAttribute("result", false);
			}
			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);

			// 비밀번호 찾기
		} else if (action.equals(ACTION_SEARCH_PW)) {
			String targetEmergencyEmail = request.getParameter("email");

			UserInfoBean userinfoBean = userInfoControler.getUserInfoByEmergencyEmail(targetEmergencyEmail);

			if (userinfoBean != null) {
				String tmpPw = userInfoControler.updatePwByEmergencyEmail(targetEmergencyEmail);

				// 이메일 보냄.
				Mailer.send(targetEmergencyEmail, "drawUML 임시 비밀번호 발송 메일입니다.", "당신의 임시 비밀번호는 " + tmpPw + " 입니다.");

				setMovePage("id_pw_search_view.jsp", request);
				request.setAttribute("result", true);
			} else {
				setMovePage("id_pw_search_view.jsp", request);
				request.setAttribute("result", false);
			}
			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);
		}
	}

	// 페이지 이동 설정 메소드 contantPageDetail은 main_view/main_view.jsp안의 include의 값
	private void setMovePage(String contantPageDetail, HttpServletRequest request) {
		request.setAttribute("contentPage", "main_view/main_view.jsp");
		request.setAttribute("contentPageDetail", contantPageDetail);
	}

}

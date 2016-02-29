package waut.controler;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import waut.bean.CommentInfoBean;
import waut.bean.FileInfoBean;
import waut.bean.LogInfoBean;
import waut.dao.LogInfoDAO;

public class LogInfoControlerForward extends ControlerForward {

	private static final long serialVersionUID = 1L;

	private static final String REQ_ACTION = "action";

	private static final String ACTION_GET_LOG_LIST = "getLogList";
	private static final String ACTION_SAVE_LOG = "saveLog";

	private LogInfoControler logInfoControler = new LogInfoControler();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String action = request.getParameter(REQ_ACTION);
		String viewPath = "/jsp/view.jsp";

		if (action == null)
			return;

		if (action.equals(ACTION_GET_LOG_LIST)) {
			String fileID = request.getParameter("fileID");

			ArrayList<LogInfoBean> logInfoBeanList = logInfoControler.getLogList(fileID);

			JSONArray jsonArray = new JSONArray();

			for (int i = 0; i < logInfoBeanList.size(); i++) {
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("id", logInfoBeanList.get(i).getId());
				jsonObj.put("ownerID", logInfoBeanList.get(i).getOwnerID());
				jsonObj.put("ownerName", logInfoBeanList.get(i).getOwnerName());
				jsonObj.put("date", logInfoBeanList.get(i).getDate().toString());
				jsonObj.put("content", logInfoControler.parseContent(logInfoBeanList.get(i).getContent()));

				jsonArray.add(jsonObj);
			}

			response.setContentType("text/plain");
			response.getWriter().println(jsonArray.toJSONString());
		} else if (action.equals(ACTION_SAVE_LOG)) {
			String logID = request.getParameter("logID");
			String fileName = request.getParameter("fileName");
			String fileOwnerID = request.getParameter("fileOwnerID");
			String fileModifierID = request.getParameter("fileModifierID");
			String fileParentID = request.getParameter("fileParentID");
			String fileSharedRootID = request.getParameter("fileSharedRootID");

			JSONObject jsonObj = new JSONObject();

			FileInfoBean fib = logInfoControler.saveLog(logID, fileName, fileOwnerID, fileModifierID, fileParentID,
					fileSharedRootID);
			if (fib == null) {
				jsonObj.put("result", "false");
			} else {
				jsonObj.put("result", "true");
				jsonObj.put("fileID", fib.getId());
				jsonObj.put("fileName", fib.getName());
				jsonObj.put("fileOwnerID", fib.getOwnerID());
				jsonObj.put("fileOwnerName", fib.getOwnerName());
				jsonObj.put("fileModifierID", fib.getModifierID());
				jsonObj.put("fileModifierName", fib.getModifierName());
				jsonObj.put("fileDate", fib.getDate());
				jsonObj.put("fileParentID", fib.getParentID());
				jsonObj.put("fileShareRootID", fib.getSharedRootID());
				jsonObj.put("fileIsDelete", String.valueOf(fib.isDelete()));
				jsonObj.put("fileIsLock", String.valueOf(fib.isLock()));
			}

			response.setContentType("text/plain");
			response.getWriter().print(jsonObj.toJSONString());
		}
	}
}

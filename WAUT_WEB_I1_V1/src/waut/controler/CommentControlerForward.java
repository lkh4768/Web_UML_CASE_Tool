package waut.controler;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import waut.bean.CommentInfoBean;

public class CommentControlerForward extends ControlerForward {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static final String REQ_ACTION = "action";

	private static final String ACTION_ADD_COMMENT = "addComment";
	private static final String ACTION_GET_COMMENT_LIST = "getCommentList";
	private static final String ACTION_DEL_COMMENT = "delComment";
	private static final String ACTION_MODIFY_COMMENT = "modifyComment";

	private CommentControler commentControler = new CommentControler();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String action = request.getParameter(REQ_ACTION);
		String viewPath = "/jsp/view.jsp";

		if (action == null)
			return;
		if (action.equals(ACTION_ADD_COMMENT)) {
			String fileID = request.getParameter("fileID");
			String ownerID = request.getParameter("ownerID");
			String comment = request.getParameter("comment");

			CommentInfoBean cib = commentControler.addComment(fileID, ownerID, comment);

			JSONObject jsonObj = new JSONObject();

			if (cib == null) {
				jsonObj.put("result", "false");
			} else {
				jsonObj.put("result", "true");
				jsonObj.put("id", cib.getId());
				jsonObj.put("fileID", cib.getFileID());
				jsonObj.put("date", cib.getDate());
				jsonObj.put("ownerID", cib.getOwnerID());
				jsonObj.put("ownerName", cib.getOwnerName());
				jsonObj.put("comment", cib.getComment());
			}
			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_GET_COMMENT_LIST)) {
			String fileID = request.getParameter("fileID");

			ArrayList<CommentInfoBean> commentInfoBeanList = commentControler.getCommentList(fileID);

			JSONArray jsonArray = new JSONArray();

			for (int i = 0; i < commentInfoBeanList.size(); i++) {
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("id", commentInfoBeanList.get(i).getId());
				jsonObj.put("ownerID", commentInfoBeanList.get(i).getOwnerID());
				jsonObj.put("ownerName", commentInfoBeanList.get(i).getOwnerName());
				jsonObj.put("date", commentInfoBeanList.get(i).getDate().toString());
				jsonObj.put("comment", commentInfoBeanList.get(i).getComment());
				jsonArray.add(jsonObj);
			}

			response.setContentType("text/plain");
			response.getWriter().println(jsonArray.toJSONString());
		} else if (action.equals(ACTION_DEL_COMMENT)) {
			String id = request.getParameter("id");

			JSONObject jsonObj = new JSONObject();
			jsonObj.put("result", String.valueOf(commentControler.deleteComment(id)));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_MODIFY_COMMENT)) {
			String id = request.getParameter("id");
			String comment = request.getParameter("comment");

			JSONObject jsonObj = new JSONObject();
			jsonObj.put("result", String.valueOf(commentControler.modifyComment(id, comment)));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		}
	}
}

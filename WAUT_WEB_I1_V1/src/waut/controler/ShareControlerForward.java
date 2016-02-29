package waut.controler;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import waut.bean.CommentInfoBean;
import waut.bean.ShareInfoBean;

public class ShareControlerForward extends ControlerForward {
	
	private static final String REQ_ACTION = "action";
	private static final String REQ_GET_MEMBER_LIST = "getMemberList";
	private static final String REQ_ADD_SHARE_MEMBER = "addShareMember";
	private static final String REQ_DELTE_SHARE_MEMBER ="deleteShareMember";
	
	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		String action = request.getParameter(REQ_ACTION);
		String viewPath = "/jsp/view.jsp";
		
		ShareControler shareControler = new ShareControler();
		

		HttpSession session = request.getSession(false);

		if (action == null){
			
		}else if(action.equals(REQ_GET_MEMBER_LIST)){
			
			ArrayList<ShareInfoBean> shareInfoBeanList = shareControler.getList(request.getParameter("folderID"));
			
			JSONArray jsonArray = new JSONArray();

				for (int i = 0; i < shareInfoBeanList.size(); i++) {
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("member_id", shareInfoBeanList.get(i).getShare_member_id());
				jsonObj.put("member_name", shareInfoBeanList.get(i).getShare_member_name());
				jsonObj.put("folder_id", shareInfoBeanList.get(i).getShare_shared_root_id());
				jsonArray.add(jsonObj);
			}
			response.setContentType("text/plain");
			response.getWriter().println(jsonArray.toJSONString());
			
			
		}else if(action.equals(REQ_ADD_SHARE_MEMBER)){
			ShareInfoBean shareInfoBean = new ShareInfoBean();

			shareInfoBean.setShare_shared_root_id(request.getParameter("folderID"));
			shareInfoBean.setShare_member_id(request.getParameter("memberID").trim());
			
			JSONObject jsonObj = new JSONObject();
			if(shareControler.confirmID(shareInfoBean)){
				if((shareControler.addSharedMember(shareInfoBean))==null){
					jsonObj.put("result", "overlapped");
				}else{
					jsonObj.put("result", "true");
					jsonObj.put("folderID", shareInfoBean.getShare_shared_root_id());
					jsonObj.put("userName", shareInfoBean.getShare_member_name());
					jsonObj.put("userID", shareInfoBean.getShare_member_id());
			
				}
			}else{
				jsonObj.put("result", "empty");
			}
		
			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
			
		}else if(action.equals(REQ_DELTE_SHARE_MEMBER)){
			ShareInfoBean shareInfoBean = new ShareInfoBean();
			
			shareInfoBean.setShare_member_id(request.getParameter("memberID"));
			shareInfoBean.setShare_shared_root_id(request.getParameter("folderID"));

			shareControler.deleteSharedMember(shareInfoBean);
			int members = shareControler.getList(shareInfoBean.getShare_shared_root_id()).size();
			if(members == 0){
				shareControler.unSharedFolder(shareInfoBean.getShare_shared_root_id(), "0");
			}
			JSONObject jsonObj = new JSONObject();
			jsonObj.put("result", "true");
			jsonObj.put("members", members);
			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());

		}
	}
			
}

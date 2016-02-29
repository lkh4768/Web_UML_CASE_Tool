package waut.controler;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.simple.JSONObject;

import waut.bean.FileInfoBean;

public class EditorControlerForward extends ControlerForward {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static final String REQ_ACTION = "action";

	private static final String ACTION_MOVE_EDITOR = "editorPage";
	private static final String ACTION_EXPORT = "export";
	private static final String ACTION_IMPORT = "import";
	private static final String ACTION_DOWNLOAD = "download";
	private static final String ACTION_UNLOCK_FILE = "unlockFile";
	private static final String ACTION_OPEN_FILE = "openFile";
	private static final String ACTION_SAVE_FILE = "saveFile";
	private static final String ACTION_SAVE_AS_FILE = "saveAsFile";
	private static final String ACTION_MOVE_EDITOR_BY_LOG = "editorPageByLog";

	private EditorControler editorControler = new EditorControler();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String action = request.getParameter(REQ_ACTION);
		String viewPath = "/jsp/view.jsp";

		// obtains ServletContext
		ServletContext context = getServletContext();
		HttpSession session = request.getSession(false);

		if (action == null)
			return;

		if (action.equals(ACTION_MOVE_EDITOR)) {
			String targetId = (String) session.getAttribute("id");

			if (targetId != null) {
				String fileID = request.getParameter("fileID");
				String fileName = request.getParameter("fileName");
				String fileOwnerID = request.getParameter("fileOwnerID");
				String fileOwnerName = request.getParameter("fileOwnerName");
				String fileModifierID = request.getParameter("fileModifierID");
				String fileModifierName = request.getParameter("fileModifierName");
				String fileSharedRootID = request.getParameter("fileSharedRootID");
				String fileParentID = request.getParameter("fileParentID");

				FileControler fc = new FileControler();

				request.setAttribute("fileID", fileID);
				request.setAttribute("fileName", fileName);
				request.setAttribute("fileOwnerID", fileOwnerID);
				request.setAttribute("fileOwnerName", fileOwnerName);
				request.setAttribute("fileModifierID", fileModifierID);
				request.setAttribute("fileModifierName", fileModifierName);
				request.setAttribute("fileSharedRootID", fileSharedRootID);
				request.setAttribute("fileParentID", fileParentID);
				request.setAttribute("fileContent", fc.readFile(fileID));
				request.setAttribute("contentPage", "editor_view/editor_view.jsp");

				RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
				dispatcher.forward(request, response);
			} else {
				request.setAttribute("contentPage", "main_view/main_view.jsp");
				request.setAttribute("contentPageDetail", "index_view.jsp");

				RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
				dispatcher.forward(request, response);
			}

		} else if (action.equals(ACTION_EXPORT)) {
			String fileContent = request.getParameter("fileContent");
			String fileName = request.getParameter("fileName");

			FileControler fc = new FileControler();
			fc.storeFile(fileName, fileContent, context.getRealPath("/"));
		} else if (action.equals(ACTION_DOWNLOAD)) {
			String fileName = request.getParameter("fileName");
			String filePath = context.getRealPath("/") + fileName;
			File downloadFile = new File(filePath);
			FileInputStream inStream = new FileInputStream(downloadFile);

			// gets MIME type of the file
			String mimeType = "text/plain";
			if (mimeType == null) {
				// set to binary type if MIME mapping not found
				mimeType = "application/octet-stream";
			}

			// modifies response
			response.setContentType(mimeType);
			response.setContentLength((int) downloadFile.length());

			String browser = request.getHeader("User-Agent");

			// 파일 이름 인코딩
			if (browser.contains("MSIE") || browser.contains("Trident") || browser.contains("Chrome")) {
				filePath = URLEncoder.encode(downloadFile.getName(), "UTF-8").replaceAll("\\+", "%20");
			} else {
				filePath = new String(downloadFile.getName().getBytes("UTF-8"), "ISO-8859-1");
			}

			// forces download
			String headerKey = "Content-Disposition";
			String headerValue = String.format("attachment; filename=\"%s\"", filePath);
			response.setHeader(headerKey, headerValue);

			// obtains response's output stream
			OutputStream outStream = response.getOutputStream();

			byte[] buffer = new byte[4096];
			int bytesRead = -1;

			while ((bytesRead = inStream.read(buffer)) != -1) {
				outStream.write(buffer, 0, bytesRead);
			}

			inStream.close();
			outStream.close();

		} else if (action.equals(ACTION_IMPORT)) {
			String result = "";

			try {
				List items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);

				result = editorControler.importFile(items);
			} catch (FileUploadException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(result);
		} else if (action.equals(ACTION_UNLOCK_FILE)) {
			String fileIDList = request.getParameter("fileIDList");

			editorControler.unlockFile(fileIDList);
		} else if (action.equals(ACTION_OPEN_FILE)) {
			String fileID = request.getParameter("fileID");
			String fileModifierID = request.getParameter("fileModifierID");

			FileInfoBean fileInfoBean = editorControler.openFile(fileID, fileModifierID);

			JSONObject jsonObj = new JSONObject();

			if (fileInfoBean == null) {
				jsonObj.put("result", "false");
			} else {
				jsonObj.put("result", "true");
				jsonObj.put("fileID", fileInfoBean.getId());
				jsonObj.put("fileName", fileInfoBean.getName());
				jsonObj.put("fileOwnerID", fileInfoBean.getOwnerID());
				jsonObj.put("fileOwnerName", fileInfoBean.getOwnerName());
				jsonObj.put("fileModifierID", fileInfoBean.getModifierID());
				jsonObj.put("fileModifierName", fileInfoBean.getModifierName());
				jsonObj.put("fileSharedRootID", fileInfoBean.getSharedRootID());
				jsonObj.put("fileParentID", fileInfoBean.getParentID());
				jsonObj.put("fileContent", editorControler.readFile(fileID));
			}

			response.setContentType("text/plain");
			response.getWriter().print(jsonObj.toJSONString());
		} else if (action.equals(ACTION_SAVE_FILE)) {
			String fileID = request.getParameter("fileID");
			String fileOwnerID = request.getParameter("fileOwnerID");
			String fileModifierID = request.getParameter("fileModifierID");
			String fileParentID = request.getParameter("fileParentID");
			String fileContent = request.getParameter("fileContent");
			String fileImg = request.getParameter("fileImg");

			String[] tmpfileImg = fileImg.split(",");

			JSONObject jsonObj = new JSONObject();
			if (editorControler.saveFile(fileID, fileOwnerID, fileModifierID, fileParentID, fileContent,
					tmpfileImg[1]) == null)
				jsonObj.put("result", "false");
			else
				jsonObj.put("result", "true");

			response.setContentType("text/plain");
			response.getWriter().print(jsonObj.toJSONString());
		} else if (action.equals(ACTION_SAVE_AS_FILE)) {
			String fileName = request.getParameter("fileName");
			String fileOwnerID = request.getParameter("fileOwnerID");
			String fileModifierID = request.getParameter("fileModifierID");
			String fileParentID = request.getParameter("fileParentID");
			String fileSharedRootID = request.getParameter("fileSharedRootID");
			String fileContent = request.getParameter("fileContent");
			String fileImg = request.getParameter("fileImg");

			String[] tmpfileImg = fileImg.split(",");

			FileInfoBean fileInfoBean = editorControler.saveAsFile(fileName, fileOwnerID, fileModifierID, fileParentID,
					fileSharedRootID, fileContent, tmpfileImg[1]);

			JSONObject jsonObj = new JSONObject();

			if (fileInfoBean == null) {
				jsonObj.put("result", "false");
			} else {
				jsonObj.put("result", "true");
				jsonObj.put("fileID", fileInfoBean.getId());
				jsonObj.put("fileName", fileInfoBean.getName());
				jsonObj.put("fileOwnerID", fileInfoBean.getOwnerID());
				jsonObj.put("fileOwnerName", fileInfoBean.getOwnerName());
				jsonObj.put("fileModifierID", fileInfoBean.getModifierID());
				jsonObj.put("fileModifierName", fileInfoBean.getModifierName());
				jsonObj.put("fileSharedRootID", fileInfoBean.getSharedRootID());
				jsonObj.put("fileParentID", fileInfoBean.getParentID());
				jsonObj.put("fileContent", fileContent);
			}

			response.setContentType("text/plain");
			response.getWriter().print(jsonObj.toJSONString());
		} else if (action.equals(ACTION_MOVE_EDITOR_BY_LOG)) {
			String fileName = request.getParameter("fileName");
			String logID = request.getParameter("logID");

			FileControler fc = new FileControler();

			request.setAttribute("fileName", fileName);
			request.setAttribute("fileContent", fc.readFile(logID));
			request.setAttribute("contentPage", "editor_view/editor_view.jsp");

			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
			dispatcher.forward(request, response);
		}

	}
}

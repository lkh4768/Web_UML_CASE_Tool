package waut.controler;

import java.io.IOException;
import java.util.ArrayList;
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
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.sun.javafx.collections.MappingChange.Map;

import waut.bean.FileInfoBean;
import waut.bean.FolderInfoBean;
import waut.bean.UserInfoBean;

public class ProjectControlerForward extends ControlerForward {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static final String REQ_ACTION = "action";

	private static final String ACTION_MOVE_PROJECT = "projectPage";
	private static final String ACTION_GET_ENTITY = "getEntity";
	private static final String ACTION_GET_SHARED_ENTITY = "getSharedEntity";
	private static final String ACTION_MOVE_TRASH_VIEW = "moveTrashView";

	private static final String ACTION_ADD_FOLDER = "addFolder";
	private static final String ACTION_RENAME_FOLDER = "renameFolder";
	private static final String ACTION_MOVE_FOLDER = "moveFolder";
	private static final String ACTION_MOVE_TO_TRASH_FOLDER = "moveToTrashFolder";
	private static final String ACTION_COPY_FOLDER = "copyFolder";
	private static final String ACTION_DELETE_FOLDER = "deleteFolder";
	private static final String ACTION_RESTORE_FOLDER = "restoreFolder";
	private static final String ACTION_EXPORT_FOLDER = "exportFolder";

	private static final String ACTION_MOVE_FILE = "moveFile";
	private static final String ACTION_COPY_FILE = "copyFile";
	private static final String ACTION_DELETE_FILE = "deleteFile";
	private static final String ACTION_RESTORE_FILE = "restoreFile";
	private static final String ACTION_ADD_FILE = "addFile";
	private static final String ACTION_RENAME_FILE = "renameFile";
	private static final String ACTION_MOVE_TO_TRASH_FILE = "moveToTrashFile";
	private static final String ACTION_IMPORT_FILE = "importFile";
	private static final String ACTION_EXPORT_FILE = "exportFile";
	private static final String ACTION_MOVE_EDITOR_VIEW = "moveEditorView";

	private static final String ACTION_ALL_DELETE = "allDelete";
	private static final String ACTION_ALL_RESTORE = "allRestore";
	private static final String ACTION_ALL_EXPORT = "allExport";
	private static final String ACTION_ALL_MOVE = "allMove";
	private static final String ACTION_ALL_COPY = "allCopy";
	private static final String ACTION_EMPTY_TRASH = "emptyTrash";
	private static final String ACTION_ALL_MOVE_TO_TRASH = "allMoveToTrash";

	private static final String ACTION_SEARCH_ENTITY = "searchEntity";

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		String action = request.getParameter(REQ_ACTION);
		String viewPath = "/jsp/view.jsp";

		FolderControler foc = new FolderControler();
		FileControler fic = new FileControler();

		HttpSession session = request.getSession(false);

		if (action == null)
			return;

		// 메인 인덱스 화면 이동
		if (action.equals(ACTION_MOVE_PROJECT)) {
			String targetId = (String) session.getAttribute("id");

			if (targetId != null) {
				String userID = request.getParameter("userID");
				boolean result = false;

				if (fic.checkTrash(userID) || foc.checkTrash(userID)) {
					result = true;
				}

				request.setAttribute("delEntity", result);
				request.setAttribute("folderParentID", 0);
				request.setAttribute("contentPage", "project_view/project_view.jsp");

				RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
				dispatcher.forward(request, response);
			} else {
				request.setAttribute("contentPage", "main_view/main_view.jsp");
				request.setAttribute("contentPageDetail", "index_view.jsp");

				RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(viewPath);
				dispatcher.forward(request, response);
			}

		} else if (action.equals(ACTION_GET_ENTITY)) {

			String folderID = request.getParameter("folderID");
			String ownerID = request.getParameter("ownerID");

			ArrayList<FolderInfoBean> folders = foc.getFolders(folderID, ownerID);
			ArrayList<FileInfoBean> files = fic.getFiles(folderID);

			JSONArray jsonArray = new JSONArray();

			// 폴더
			for (int i = 0; i < folders.size(); i++) {
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("type", "folder");
				jsonObj.put("id", folders.get(i).getId());
				jsonObj.put("name", folders.get(i).getName());
				jsonObj.put("ownerID", folders.get(i).getOwnerID());
				jsonObj.put("ownerName", folders.get(i).getOwnerName());
				jsonObj.put("date", folders.get(i).getDate().toString());
				jsonObj.put("isDelete", String.valueOf(folders.get(i).isDelete()));
				jsonObj.put("parentID", folders.get(i).getParentID());
				jsonObj.put("sharedRootID", folders.get(i).getSharedRootID());
				jsonArray.add(jsonObj);
			}

			// 파일
			for (int i = 0; i < files.size(); i++) {
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("type", "file");
				jsonObj.put("id", files.get(i).getId());
				jsonObj.put("name", files.get(i).getName());
				jsonObj.put("ownerID", files.get(i).getOwnerID());
				jsonObj.put("ownerName", files.get(i).getOwnerName());
				jsonObj.put("modifierID", files.get(i).getModifierID());
				jsonObj.put("modifierName", files.get(i).getModifierName());
				jsonObj.put("date", files.get(i).getDate().toString());
				jsonObj.put("isDelete", String.valueOf(files.get(i).isDelete()));
				jsonObj.put("parentID", files.get(i).getParentID());
				jsonObj.put("sharedRootID", files.get(i).getSharedRootID());
				jsonObj.put("isLock", String.valueOf(files.get(i).isLock()));
				jsonArray.add(jsonObj);
			}

			response.setContentType("text/plain");
			response.getWriter().println(jsonArray.toJSONString());

		} else if (action.equals(ACTION_GET_SHARED_ENTITY)) {

			ArrayList<FolderInfoBean> folders = foc.getSharedRootFolders(session.getAttribute("id").toString());

			JSONArray jsonArray = new JSONArray();

			for (int i = 0; i < folders.size(); i++) {
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("id", folders.get(i).getId());
				jsonObj.put("name", folders.get(i).getName());
				jsonObj.put("ownerID", folders.get(i).getOwnerID());
				jsonObj.put("ownerName", folders.get(i).getOwnerName());
				jsonObj.put("date", folders.get(i).getDate().toString());
				jsonObj.put("isDelete", String.valueOf(folders.get(i).isDelete()));
				jsonObj.put("parentID", folders.get(i).getParentID());
				jsonObj.put("sharedRootID", folders.get(i).getSharedRootID());
				jsonArray.add(jsonObj);

			}

			response.setContentType("text/plain");
			response.getWriter().println(jsonArray.toJSONString());

		} else if (action.equals(ACTION_ADD_FOLDER)) {

			String folderName = request.getParameter("folderName");
			String ownerID = request.getParameter("owner").trim();
			String parentID = request.getParameter("parentID");
			String sharedRootID = request.getParameter("sharedRootID");

			JSONObject jsonObj = new JSONObject();

			FolderInfoBean folderInfoBean = foc.addFolder(folderName, ownerID, parentID, sharedRootID);
			if (folderInfoBean == null) {
				jsonObj.put("result", "false");
			} else {
				jsonObj.put("result", "true");

				jsonObj.put("folderID", folderInfoBean.getId());
				jsonObj.put("folderName", folderInfoBean.getName());
				jsonObj.put("folderOwnerID", folderInfoBean.getOwnerID());
				jsonObj.put("folderOwnerName", folderInfoBean.getOwnerName());
				jsonObj.put("folderDate", folderInfoBean.getDate());
				jsonObj.put("folderParentID", folderInfoBean.getParentID());
				jsonObj.put("folderShareRootID", folderInfoBean.getSharedRootID());
				jsonObj.put("folderDelete", String.valueOf(folderInfoBean.isDelete()));
			}

			response.setContentType("text/plain");
			response.getWriter().print(jsonObj.toJSONString());

		} else if (action.equals(ACTION_RENAME_FOLDER)) {
			String folderName = request.getParameter("folderName");
			String folderID = request.getParameter("folderID").trim();
			String parentID = request.getParameter("folderParentID").trim();

			JSONObject jsonObj = new JSONObject();
			jsonObj.put("result", String.valueOf(foc.renameFolder(folderID, folderName, parentID)));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());

		} else if (action.equals(ACTION_MOVE_FOLDER)) {
			String id = request.getParameter("id");
			String newName = request.getParameter("newName");
			String newParentID = request.getParameter("newParentID");
			String newOwnerID = request.getParameter("newOwnerID");
			String newModifierID = request.getParameter("newModifierID");
			String newSharedRootID = request.getParameter("newSharedRootID");

			JSONObject jsonObj = new JSONObject();
			jsonObj.put("result",
					String.valueOf(foc.moveFolder(id, newName, newParentID, newOwnerID, newSharedRootID)));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_MOVE_TO_TRASH_FOLDER)) {
			String id = request.getParameter("id");

			ArrayList<String> lockFileList = foc.moveToTrashFolder(id, id, new ArrayList<String>());

			JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < lockFileList.size(); i++) {
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("name", lockFileList.get(i));
				jsonArray.add(jsonObj);
			}

			response.setContentType("text/plain");
			response.getWriter().println(jsonArray.toJSONString());
		} else if (action.equals(ACTION_COPY_FOLDER)) {
			String id = request.getParameter("id");
			String newName = request.getParameter("newName");
			String newParentID = request.getParameter("newParentID");
			String newOwnerID = request.getParameter("newOwnerID");
			String newModifierID = request.getParameter("newModifierID");
			String newSharedRootID = request.getParameter("newSharedRootID");

			JSONObject jsonObj = new JSONObject();
			if (foc.copyFolder(id, newName, newParentID, newOwnerID, newModifierID, newSharedRootID) != null) {
				jsonObj.put("result", "true");
			} else {
				jsonObj.put("result", "false");
			}

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());

		} else if (action.equals(ACTION_DELETE_FOLDER)) {
			String id = request.getParameter("id");

			JSONObject jsonObj = new JSONObject();

			boolean result = foc.deleteFolder(id);

			jsonObj.put("result", String.valueOf(result));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_RESTORE_FOLDER)) {
			String id = request.getParameter("id");
			String name = request.getParameter("name");
			String parentID = request.getParameter("parentID");

			JSONObject jsonObj = new JSONObject();
			jsonObj.put("result", String.valueOf(foc.restoreFolder(id, name, parentID)));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_ADD_FILE)) {

			String name = request.getParameter("name");
			String ownerID = request.getParameter("ownerID");
			String parentID = request.getParameter("parentID");
			String modifierID = request.getParameter("modifierID");
			String content = request.getParameter("content");
			String sharedRootID = request.getParameter("sharedRootID");

			FileInfoBean fileInfoBean = fic.addFile(name, ownerID, modifierID, content, parentID, sharedRootID, true);

			JSONObject jsonObj = new JSONObject();

			if (fileInfoBean == null) {
				jsonObj.put("result", "false");
			} else {
				jsonObj.put("result", "true");
				jsonObj.put("id", fileInfoBean.getId());
				jsonObj.put("name", fileInfoBean.getName());
				jsonObj.put("ownerID", fileInfoBean.getOwnerID());
				jsonObj.put("ownerName", fileInfoBean.getOwnerName());
				jsonObj.put("modifierID", fileInfoBean.getOwnerID());
				jsonObj.put("modifierName", fileInfoBean.getOwnerName());
				jsonObj.put("date", fileInfoBean.getDate());
				jsonObj.put("isDelete", String.valueOf(fileInfoBean.isDelete()));
				jsonObj.put("parentID", fileInfoBean.getParentID());
				jsonObj.put("sharedRootID", fileInfoBean.getSharedRootID());
				jsonObj.put("isLock", String.valueOf(fileInfoBean.isLock()));
			}

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_RENAME_FILE)) {
			String id = request.getParameter("id");
			String parentID = request.getParameter("parentID");
			String name = request.getParameter("name");

			JSONObject jsonObj = new JSONObject();
			jsonObj.put("result", String.valueOf(fic.renameFile(id, name, parentID)));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_MOVE_TO_TRASH_FILE)) {
			String id = request.getParameter("id");

			JSONObject jsonObj = new JSONObject();
			jsonObj.put("result", String.valueOf(fic.moveToTrashFile(id)));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_MOVE_TRASH_VIEW)) {
			ArrayList<FolderInfoBean> folders = foc.getFoldersInTrash(session.getAttribute("id").toString());
			ArrayList<FileInfoBean> files = fic.getFilesInTrash(session.getAttribute("id").toString());

			JSONArray jsonArray = new JSONArray();

			// 폴더
			for (int i = 0; i < folders.size(); i++) {
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("type", "folder");
				jsonObj.put("id", folders.get(i).getId());
				jsonObj.put("name", folders.get(i).getName());
				jsonObj.put("ownerID", folders.get(i).getOwnerID());
				jsonObj.put("ownerName", folders.get(i).getOwnerName());
				jsonObj.put("date", folders.get(i).getDate().toString());
				jsonObj.put("isDelete", String.valueOf(folders.get(i).isDelete()));
				jsonObj.put("parentID", folders.get(i).getParentID());
				jsonObj.put("sharedRootID", folders.get(i).getSharedRootID());
				jsonArray.add(jsonObj);
			}

			// 파일
			for (int i = 0; i < files.size(); i++) {
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("type", "file");
				jsonObj.put("id", files.get(i).getId());
				jsonObj.put("name", files.get(i).getName());
				jsonObj.put("ownerID", files.get(i).getOwnerID());
				jsonObj.put("ownerName", files.get(i).getOwnerName());
				jsonObj.put("modifierID", files.get(i).getModifierID());
				jsonObj.put("modifierName", files.get(i).getModifierName());
				jsonObj.put("date", files.get(i).getDate().toString());
				jsonObj.put("isDelete", String.valueOf(files.get(i).isDelete()));
				jsonObj.put("parentID", files.get(i).getParentID());
				jsonObj.put("sharedRootID", files.get(i).getSharedRootID());
				jsonObj.put("isLock", String.valueOf(files.get(i).isLock()));
				jsonArray.add(jsonObj);
			}

			response.setContentType("text/plain");
			response.getWriter().println(jsonArray.toJSONString());
		} else if (action.equals(ACTION_MOVE_FILE)) {
			String id = request.getParameter("id");
			String newName = request.getParameter("newName");
			String newParentID = request.getParameter("newParentID");
			String newOwnerID = request.getParameter("newOwnerID");
			String newModifierID = request.getParameter("newModifierID");
			String newSharedRootID = request.getParameter("newSharedRootID");

			JSONObject jsonObj = new JSONObject();
			jsonObj.put("result", String
					.valueOf(fic.moveFile(id, newName, newParentID, newOwnerID, newModifierID, newSharedRootID, true)));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_COPY_FILE)) {
			String id = request.getParameter("id");
			String newName = request.getParameter("newName");
			String newParentID = request.getParameter("newParentID");
			String newOwnerID = request.getParameter("newOwnerID");
			String newModifierID = request.getParameter("newModifierID");
			String newSharedRootID = request.getParameter("newSharedRootID");

			FileInfoBean fileInfoBean = fic.copyFile(id, newName, newParentID, newOwnerID, newModifierID,
					newSharedRootID, true);

			JSONObject jsonObj = new JSONObject();

			if (fileInfoBean == null) {
				jsonObj.put("result", "false");
			} else {
				jsonObj.put("result", "true");
				jsonObj.put("id", fileInfoBean.getId());
				jsonObj.put("name", fileInfoBean.getName());
				jsonObj.put("ownerID", fileInfoBean.getOwnerID());
				jsonObj.put("ownerName", fileInfoBean.getOwnerName());
				jsonObj.put("modifierID", fileInfoBean.getOwnerID());
				jsonObj.put("modifierName", fileInfoBean.getOwnerName());
				jsonObj.put("date", fileInfoBean.getDate());
				jsonObj.put("isDelete", String.valueOf(fileInfoBean.isDelete()));
				jsonObj.put("parentID", fileInfoBean.getParentID());
				jsonObj.put("sharedRootID", fileInfoBean.getSharedRootID());
				jsonObj.put("isLock", String.valueOf(fileInfoBean.isLock()));
			}

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_DELETE_FILE)) {
			String id = request.getParameter("id");

			JSONObject jsonObj = new JSONObject();

			boolean result = fic.deleteFile(id);
			jsonObj.put("result", String.valueOf(result));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_RESTORE_FILE)) {
			String id = request.getParameter("id");
			String name = request.getParameter("name");
			String parentID = request.getParameter("parentID");

			JSONObject jsonObj = new JSONObject();

			jsonObj.put("result", String.valueOf(fic.resotreFile(id, name, parentID)));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_IMPORT_FILE)) {
			String content = "";

			EditorControler editorControler = new EditorControler();
			try {
				List items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);

				content = editorControler.importFile(items);
			} catch (FileUploadException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(content);
		} else if (action.equals(ACTION_MOVE_EDITOR_VIEW)) {
			String fileID = request.getParameter("fileID");
			String modifierID = request.getParameter("modifierID");

			JSONObject jsonObj = new JSONObject();

			jsonObj.put("result", String.valueOf(fic.moveEditorView(fileID, modifierID)));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_EXPORT_FILE)) {
			String id = request.getParameter("id");
			String name = request.getParameter("name");

			JSONObject jsonObj = new JSONObject();

			// obtains ServletContext
			ServletContext context = getServletContext();

			jsonObj.put("result", String.valueOf(fic.exportFile(id, name, context.getRealPath("/"))));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_EXPORT_FOLDER)) {
			String id = request.getParameter("id");
			String name = request.getParameter("name");

			JSONObject jsonObj = new JSONObject();

			// obtains ServletContext
			ServletContext context = getServletContext();

			jsonObj.put("result", String.valueOf(foc.exportFolder(id, name, context.getRealPath("/"), id)));

			response.setContentType("text/plain");
			response.getWriter().println(jsonObj.toJSONString());
		} else if (action.equals(ACTION_ALL_DELETE)) {
			JSONParser parser = new JSONParser();
			Object obj = null;
			try {
				obj = parser.parse(request.getParameter("deleteList"));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			JSONArray jsonArray = (JSONArray) obj;

			if (jsonArray != null) {
				for (int i = 0; i < jsonArray.size(); i++) {
					JSONObject jsonObj = (JSONObject) jsonArray.get(i);
					if (jsonObj.get("type").toString().equals("folder"))
						foc.deleteFolder(jsonObj.get("id").toString());
					else
						fic.deleteFile(jsonObj.get("id").toString());
				}
			}
			response.setContentType("text/plain");
			response.getWriter().println("true");
		} else if (action.equals(ACTION_SEARCH_ENTITY)) {

			String clue = request.getParameter("clue");
			String ownerID = request.getParameter("ownerID");

			ShareControler shareControler = new ShareControler();
			ArrayList<FolderInfoBean> folders = foc.searchFolder(ownerID, clue);
			ArrayList<FileInfoBean> files = fic.searchFile(ownerID, clue);
			folders.addAll(shareControler.searchSharedFolder(ownerID, clue));
			files.addAll(shareControler.searchSharedFile(ownerID, clue));
			JSONArray jsonArray = new JSONArray();

			// 폴더
			if (folders != null) {
				for (int i = 0; i < folders.size(); i++) {
					JSONObject jsonObj = new JSONObject();
					jsonObj.put("type", "folder");
					jsonObj.put("id", folders.get(i).getId());
					jsonObj.put("name", folders.get(i).getName());
					jsonObj.put("ownerID", folders.get(i).getOwnerID());
					jsonObj.put("ownerName", folders.get(i).getOwnerName());
					jsonObj.put("date", folders.get(i).getDate().toString());
					jsonObj.put("isDelete", String.valueOf(folders.get(i).isDelete()));
					jsonObj.put("parentID", folders.get(i).getParentID());
					jsonObj.put("sharedRootID", folders.get(i).getSharedRootID());
					jsonArray.add(jsonObj);
				}
			}

			// 파일
			if (files != null) {
				for (int i = 0; i < files.size(); i++) {
					JSONObject jsonObj = new JSONObject();
					jsonObj.put("type", "file");
					jsonObj.put("id", files.get(i).getId());
					jsonObj.put("name", files.get(i).getName());
					jsonObj.put("ownerID", files.get(i).getOwnerID());
					jsonObj.put("ownerName", files.get(i).getOwnerName());
					jsonObj.put("modifierID", files.get(i).getModifierID());
					jsonObj.put("modifierName", files.get(i).getModifierName());
					jsonObj.put("date", files.get(i).getDate().toString());
					jsonObj.put("isDelete", String.valueOf(files.get(i).isDelete()));
					jsonObj.put("parentID", files.get(i).getParentID());
					jsonObj.put("sharedRootID", files.get(i).getSharedRootID());
					jsonObj.put("isLock", String.valueOf(files.get(i).isLock()));
					jsonArray.add(jsonObj);
				}
			}
			response.setContentType("text/plain");
			response.getWriter().println(jsonArray.toJSONString());

		} else if (action.equals(ACTION_ALL_RESTORE)) {
			JSONParser parser = new JSONParser();
			Object obj = null;
			try {
				obj = parser.parse(request.getParameter("restoreList"));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			JSONArray jsonArray = (JSONArray) obj;

			JSONArray overlappingNameJsonArray = new JSONArray();

			if (jsonArray != null) {
				for (int i = 0; i < jsonArray.size(); i++) {
					JSONObject jsonObj = (JSONObject) jsonArray.get(i);
					if (jsonObj.get("type").toString().equals("folder")) {
						if (!(foc.restoreFolder(jsonObj.get("id").toString(), jsonObj.get("name").toString(),
								jsonObj.get("parentID").toString()))) {
							JSONObject tmpJsonObj = new JSONObject();
							tmpJsonObj.put("name", jsonObj.get("name").toString());
							tmpJsonObj.put("id", jsonObj.get("id").toString());
							overlappingNameJsonArray.add(tmpJsonObj);
						}

					} else {
						if (!(fic.resotreFile(jsonObj.get("id").toString(), jsonObj.get("name").toString(),
								jsonObj.get("parentID").toString()))) {
							JSONObject tmpJsonObj = new JSONObject();
							tmpJsonObj.put("name", jsonObj.get("name").toString());
							tmpJsonObj.put("id", jsonObj.get("id").toString());
							overlappingNameJsonArray.add(tmpJsonObj);
						}

					}

				}
			}
			response.setContentType("text/plain");
			response.getWriter().println(overlappingNameJsonArray.toJSONString());

		} else if (action.equals(ACTION_EMPTY_TRASH)) {
			String ownerID = request.getParameter("ownerID");

			ArrayList<FileInfoBean> filesInTrash = fic.getFilesInTrash(ownerID);
			ArrayList<FolderInfoBean> foldersInTrash = foc.getFoldersInTrash(ownerID);

			JSONArray overlappingNameJsonArray = new JSONArray();

			if (filesInTrash != null) {
				for (int i = 0; i < filesInTrash.size(); i++) {
					FileInfoBean fib = filesInTrash.get(i);
					fic.deleteFile(fib.getId());
				}
			}

			if (foldersInTrash != null) {
				for (int i = 0; i < foldersInTrash.size(); i++) {
					FolderInfoBean fob = foldersInTrash.get(i);
					foc.deleteFolder(fob.getId());
				}
			}
			response.setContentType("text/plain");
			response.getWriter().println("true");

		} else if (action.equals(ACTION_ALL_EXPORT)) {
			String userID = request.getParameter("userID");
			JSONParser parser = new JSONParser();
			Object obj = null;
			try {
				obj = parser.parse(request.getParameter("exportList"));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			JSONArray jsonArray = (JSONArray) obj;
			// obtains ServletContext
			ServletContext context = getServletContext();

			if (jsonArray != null) {
				for (int i = 0; i < jsonArray.size(); i++) {
					JSONObject jsonObj = (JSONObject) jsonArray.get(i);
					if (jsonObj.get("type").toString().equals("folder")) {
						foc.exportFolder(jsonObj.get("id").toString(), jsonObj.get("name").toString(),
								context.getRealPath("/") + userID + "/", jsonObj.get("id").toString());

					} else {
						fic.exportFile(jsonObj.get("id").toString(), jsonObj.get("name").toString(),
								context.getRealPath("/") + userID + "/");
					}
				}
			}

			try {
				foc.zipFolder(context.getRealPath("/") + userID + "/", context.getRealPath("/") + userID + ".zip");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			response.setContentType("text/plain");
			response.getWriter().println("true");
		} else if (action.equals(ACTION_ALL_MOVE_TO_TRASH)) {
			JSONParser parser = new JSONParser();
			Object obj = null;
			try {
				obj = parser.parse(request.getParameter("moveToTrashList"));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			JSONArray jsonArray = (JSONArray) obj;
			ArrayList<String> lockFileList = new ArrayList<String>();

			if (jsonArray != null) {
				for (int i = 0; i < jsonArray.size(); i++) {
					JSONObject jsonObj = (JSONObject) jsonArray.get(i);
					if (jsonObj.get("type").toString().equals("folder")) {
						ArrayList<String> tmpArray = foc.moveToTrashFolder(jsonObj.get("id").toString(),
								jsonObj.get("id").toString(), new ArrayList<String>());
						lockFileList.addAll(tmpArray);
					} else {
						if (jsonObj.get("lock").toString().equals("true"))
							lockFileList.add(jsonObj.get("name").toString());
						else
							fic.moveToTrashFile(jsonObj.get("id").toString());
					}
				}
			}

			JSONArray resultJsonArray = new JSONArray();
			for (int i = 0; i < lockFileList.size(); i++) {
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("name", lockFileList.get(i));
				resultJsonArray.add(jsonObj);
			}

			response.setContentType("text/plain");
			response.getWriter().println(resultJsonArray.toJSONString());
		} else if (action.equals(ACTION_ALL_MOVE)) {
			JSONParser parser = new JSONParser();
			Object obj = null;

			try {
				obj = parser.parse(request.getParameter("moveList"));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			String newParentID = request.getParameter("newParentID");
			String newOwnerID = request.getParameter("newOwnerID");
			String newModifierID = request.getParameter("newModifierID");
			String newSharedRootID = request.getParameter("newSharedRootID");

			JSONArray jsonArray = (JSONArray) obj;
			JSONArray resultJsonArray = new JSONArray();

			if (jsonArray != null) {
				for (int i = 0; i < jsonArray.size(); i++) {
					JSONObject jsonObj = (JSONObject) jsonArray.get(i);

					if (jsonObj.get("type").toString().equals("folder")) {
						if (!foc.moveFolder(jsonObj.get("id").toString(), jsonObj.get("name").toString(), newParentID,
								newOwnerID, newSharedRootID)) {
							JSONObject tmpJsonObj = new JSONObject();
							tmpJsonObj.put("id", jsonObj.get("id").toString());
							tmpJsonObj.put("name", jsonObj.get("name").toString());
							resultJsonArray.add(tmpJsonObj);
						}
					} else {
						if (!fic.moveFile(jsonObj.get("id").toString(), jsonObj.get("name").toString(), newParentID,
								newOwnerID, newModifierID, newSharedRootID, true)) {
							JSONObject tmpJsonObj = new JSONObject();
							tmpJsonObj.put("id", jsonObj.get("id").toString());
							tmpJsonObj.put("name", jsonObj.get("name").toString());
							resultJsonArray.add(tmpJsonObj);
						}
					}
				}
			}

			response.setContentType("text/plain");
			response.getWriter().println(resultJsonArray.toJSONString());
		} else if (action.equals(ACTION_ALL_COPY)) {
			JSONParser parser = new JSONParser();
			Object obj = null;

			try {
				obj = parser.parse(request.getParameter("copyList"));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			String newParentID = request.getParameter("newParentID");
			String newOwnerID = request.getParameter("newOwnerID");
			String newModifierID = request.getParameter("newModifierID");
			String newSharedRootID = request.getParameter("newSharedRootID");

			JSONArray jsonArray = (JSONArray) obj;
			JSONArray resultJsonArray = new JSONArray();

			if (jsonArray != null) {
				for (int i = 0; i < jsonArray.size(); i++) {
					JSONObject jsonObj = (JSONObject) jsonArray.get(i);

					if (jsonObj.get("type").toString().equals("folder")) {
						if (foc.copyFolder(jsonObj.get("id").toString(), jsonObj.get("name").toString(), newParentID,
								newOwnerID, newModifierID, newSharedRootID) == null) {
							JSONObject tmpJsonObj = new JSONObject();
							tmpJsonObj.put("id", jsonObj.get("id").toString());
							tmpJsonObj.put("name", jsonObj.get("name").toString());
							resultJsonArray.add(tmpJsonObj);
						}
					} else {
						if (fic.copyFile(jsonObj.get("id").toString(), jsonObj.get("name").toString(), newParentID,
								newOwnerID, newModifierID, newSharedRootID, true) == null) {
							JSONObject tmpJsonObj = new JSONObject();
							tmpJsonObj.put("id", jsonObj.get("id").toString());
							tmpJsonObj.put("name", jsonObj.get("name").toString());
							resultJsonArray.add(tmpJsonObj);
						}
					}
				}
			}

			response.setContentType("text/plain");
			response.getWriter().println(resultJsonArray.toJSONString());
		}

	}

}

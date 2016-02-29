package waut.controler;

import java.util.ArrayList;

import waut.bean.FileInfoBean;
import waut.bean.LogInfoBean;
import waut.dao.LogInfoDAO;

public class LogInfoControler {

	private LogInfoDAO logInfoDAO = new LogInfoDAO();

	public LogInfoBean addLog(String ownerID, String fileID, String date, int content) {
		LogInfoBean logInfoBean = new LogInfoBean();

		logInfoBean.setOwnerID(ownerID);
		logInfoBean.setFileID(fileID);
		logInfoBean.setDate(date);
		logInfoBean.setContent(content);

		if (logInfoDAO.insertDB(logInfoBean))
			return logInfoDAO.getDBByLogInfoBean(logInfoBean);
		else
			return null;
	}

	public ArrayList<LogInfoBean> getLogList(String fileID) {
		return logInfoDAO.getDBList(fileID);
	}

	public FileInfoBean saveLog(String logID, String fileName, String fileOwnerID, String fileModifierID,
			String fileParentID, String fileSharedRootID) {
		FileControler fc = new FileControler();

		String fileContent = fc.readFile(logID);

		return fc.addFile(fileName, fileOwnerID, fileModifierID, fileContent, fileParentID, fileSharedRootID, true);
	}

	public String parseContent(int content) {
		String str = null;

		switch (content) {
		case LogInfoBean.CREATE:
			str = "생성";
			break;
		case LogInfoBean.READ:
			str = "조회";
			break;
		case LogInfoBean.UPDATE:
			str = "수정";
			break;
		default:
			break;
		}

		return str;
	}
}

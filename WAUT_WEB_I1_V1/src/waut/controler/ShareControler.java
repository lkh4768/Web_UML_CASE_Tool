package waut.controler;

import java.util.ArrayList;

import waut.bean.FileInfoBean;
import waut.bean.FolderInfoBean;
import waut.bean.ShareInfoBean;
import waut.dao.FileInfoDAO;
import waut.dao.FolderInfoDAO;
import waut.dao.ShareInfoDAO;

public class ShareControler {

	private ShareInfoDAO shareInfoDAO = new ShareInfoDAO();

	public ArrayList<ShareInfoBean> getList(String sharedRootId) {
		return shareInfoDAO.getDBMemberList(sharedRootId);
	}

	public ShareInfoBean addSharedMember(ShareInfoBean shareInfoBean) {
		boolean flag = checkOverlappingID(shareInfoBean);

		if (flag) {
			enSharedFolder(shareInfoBean.getShare_shared_root_id(), shareInfoBean.getShare_shared_root_id());
			return shareInfoDAO.insertDB(shareInfoBean);
		} else {
			return null;
		}
	}

	public void enSharedFolder(String id, String rootID) {
		setSharedRoot(id, rootID);
	}

	public void unSharedFolder(String id, String rootID) {
		setSharedRoot(id, rootID);
	}

	public boolean setSharedRoot(String id, String rootID) {
		
		FolderInfoDAO folderInfoDAO = new FolderInfoDAO();

		FileControler fc = new FileControler();
		ArrayList<FolderInfoBean> childrenFolders = folderInfoDAO.getDBFolderChildrenList(id);
		ArrayList<FileInfoBean> childrenFiles = fc.getFiles(id);

		if (childrenFolders != null) {
			for (int i = 0; i < childrenFolders.size(); i++) {
				setSharedRoot(childrenFolders.get(i).getId(), rootID);
			}
		}

		if (childrenFiles != null) {
			for (int j = 0; j < childrenFiles.size(); j++) {
				fc.setSharedRoot(rootID, childrenFiles.get(j).getId());
			}
		}

		folderInfoDAO.updateSharedRootID(rootID, id);
		
		return true;
	}

	public void deleteSharedMember(ShareInfoBean shareInfoBean) {
		shareInfoDAO.deleteDB(shareInfoBean);
	}

	public boolean checkOverlappingID(ShareInfoBean shareInfoBean) {
		return shareInfoDAO.checkOverlappingID(shareInfoBean);
	}

	public boolean confirmID(ShareInfoBean shareInfoBean) {
		return shareInfoDAO.confirmID(shareInfoBean);
	}

	public ArrayList<FolderInfoBean> searchSharedFolder(String userID, String clue) {
		ArrayList<FolderInfoBean> sharedFolders = new ArrayList<FolderInfoBean>();
		ArrayList<String> sharedRootIDs = shareInfoDAO.getSharedRootID(userID);

		for (int i = 0; i < sharedRootIDs.size(); i++) {
			sharedFolders.addAll(shareInfoDAO.getSharedFolderByRoot(sharedRootIDs.get(i), clue));
		}
		return sharedFolders;
	}

	public ArrayList<FileInfoBean> searchSharedFile(String userID, String clue) {
		ArrayList<FileInfoBean> sharedFiles = new ArrayList<FileInfoBean>();
		ArrayList<String> sharedRootIDs = shareInfoDAO.getSharedRootID(userID);

		for (int i = 0; i < sharedRootIDs.size(); i++) {
			sharedFiles.addAll(shareInfoDAO.getSharedFileByRoot(sharedRootIDs.get(i), clue));
		}
		return sharedFiles;
	}

}

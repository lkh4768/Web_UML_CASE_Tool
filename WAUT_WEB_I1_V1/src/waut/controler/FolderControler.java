package waut.controler;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import waut.bean.FileInfoBean;
import waut.bean.FolderInfoBean;
import waut.dao.FolderInfoDAO;

public class FolderControler {
	private FolderInfoDAO folderInfoDAO = new FolderInfoDAO();

	public boolean checkTrash(String ownerID) {
		return folderInfoDAO.checkDBDelete(ownerID);
	}

	public ArrayList<FolderInfoBean> getFolders(String folderParentID, String owner) {
		return folderInfoDAO.getDBFolderList(folderParentID, owner);
	}

	public ArrayList<FolderInfoBean> getSharedRootFolders(String id) {
		return folderInfoDAO.getDBSharedRootFolderList(id);
	}

	public ArrayList<FolderInfoBean> getFoldersInTrash(String owner) {
		return folderInfoDAO.getDBFolderListInTrash(owner);
	}

	public FolderInfoBean addFolder(String folderName, String ownerID, String parentID, String sharedRootID) {
		FolderInfoBean folderInfoBean = new FolderInfoBean();

		folderInfoBean.setName(folderName);
		folderInfoBean.setOwnerID(ownerID);
		folderInfoBean.setParentID(parentID);
		folderInfoBean.setSharedRootID(sharedRootID);

		FolderInfoBean afterFolderInfoBean = null;

		folderInfoBean.setDate(this.getNowDate());
		if (folderInfoDAO.checkOverlappingName(folderInfoBean)) {
			if (folderInfoDAO.insertDB(folderInfoBean)) {

				// db에 삽입된 파일 id 가져오기 위해 getDB
				afterFolderInfoBean = folderInfoDAO.getDBByNameAndParentID(folderInfoBean.getParentID(),
						folderInfoBean.getName());

				if (afterFolderInfoBean != null)
					return afterFolderInfoBean;
				else
					return null;
			} else {
				return null;
			}
		} else
			return null;
	}

	public boolean renameFolder(String folderID, String folderName, String folderParentID) {
		FolderInfoBean folderInfoBean = new FolderInfoBean();

		folderInfoBean.setName(folderName);
		folderInfoBean.setId(folderID);
		folderInfoBean.setParentID(folderParentID);
		
		if (checkOverlappingName(folderInfoBean)) {
			folderInfoDAO.renameFolder(folderInfoBean);
			return true;
		} else {
			return false;
		}
	}

	public boolean moveFolder(String id, String name, String parentID, String ownerID, String sharedRootID) {
		FolderInfoBean folderInfoBean = new FolderInfoBean();

		folderInfoBean.setId(id);
		folderInfoBean.setName(name);
		folderInfoBean.setDate(getNowDate());
		folderInfoBean.setParentID(parentID);
		folderInfoBean.setOwnerID(ownerID);
		folderInfoBean.setSharedRootID(sharedRootID);

		// 이름 확인
		if (checkOverlappingName(folderInfoBean)) {
			return folderInfoDAO.updateDBPath(folderInfoBean);
		} else {
			return false;
		}
	}

	public FolderInfoBean copyFolder(String oldID, String name, String parentID, String ownerID, String newModifierID,
			String sharedRootID) {
		FolderInfoBean newFolderInfoBean = addFolder(name, ownerID, parentID, sharedRootID);

		FileControler fc = new FileControler();
		ArrayList<FolderInfoBean> childrenFolders = folderInfoDAO.getDBFolderChildrenList(oldID);
		ArrayList<FileInfoBean> childrenFiles = fc.getFiles(oldID);

		if (childrenFiles != null) {
			for (int i = 0; i < childrenFiles.size(); i++) {
				fc.copyFile(childrenFiles.get(i).getId(), childrenFiles.get(i).getName(), newFolderInfoBean.getId(),
						newFolderInfoBean.getOwnerID(), newModifierID, newFolderInfoBean.getSharedRootID(), false);
			}
		}

		// 폴더 복사 아직 안됨
		if (childrenFolders != null) {
			for (int i = 0; i < childrenFolders.size(); i++) {
				copyFolder(childrenFolders.get(i).getId(), childrenFolders.get(i).getName(), newFolderInfoBean.getId(),
						newFolderInfoBean.getOwnerID(), newModifierID, newFolderInfoBean.getSharedRootID());
			}
		}

		return newFolderInfoBean;
	}

	public ArrayList<String> moveToTrashFolder(String id, String rootID, ArrayList<String> lockFileList) {
		FileControler fc = new FileControler();
		ArrayList<FolderInfoBean> childrenFolders = folderInfoDAO.getDBFolderChildrenList(id);
		ArrayList<FileInfoBean> childrenFiles = fc.getFiles(id);

		if (childrenFiles != null) {
			for (int i = 0; i < childrenFiles.size(); i++) {
				if (childrenFiles.get(i).isLock() == true)
					lockFileList.add(childrenFiles.get(i).getName());
			}
		}

		for (int i = 0; i < childrenFolders.size(); i++) {
			moveToTrashFolder(childrenFolders.get(i).getId(), rootID, lockFileList);
		}

		if (lockFileList.size() == 0 && id == rootID) {
			FolderInfoBean folderInfoBean = new FolderInfoBean();
			folderInfoBean.setId(id);
			folderInfoBean.setDate(getNowDate());
			folderInfoBean.setDelete(true);

			folderInfoDAO.updateDBDelete(folderInfoBean);
		}

		return lockFileList;
	}

	public boolean deleteFolder(String id) {
		FileControler fc = new FileControler();
		ArrayList<FolderInfoBean> childrenFolders = folderInfoDAO.getDBFolderChildrenList(id);
		ArrayList<FileInfoBean> childrenFiles = fc.getFiles(id);

		for (int i = 0; i < childrenFolders.size(); i++) {
			deleteFolder(childrenFolders.get(i).getId());
		}

		if (childrenFiles != null) {
			for (int i = 0; i < childrenFiles.size(); i++) {
				fc.deleteFile(childrenFiles.get(i).getId());
			}
		}

		if (childrenFolders != null) {
			folderInfoDAO.deleteDB(id);
		}

		return true;
	}

	public boolean restoreFolder(String id, String name, String parentID) {
		FolderInfoBean folderInfoBean = new FolderInfoBean();

		folderInfoBean.setId(id);
		folderInfoBean.setName(name);
		folderInfoBean.setParentID(parentID);
		folderInfoBean.setDate(getNowDate());
		folderInfoBean.setDelete(false);

		if (checkOverlappingName(folderInfoBean)) {
			// isDelete을 0로 update
			if (folderInfoDAO.updateDBDelete(folderInfoBean)) {
				return true;
			} else {
				return false;
			}
		} else
			return false;
	}

	public boolean exportFolder(String id, String name, String path, String rootID) {
		FolderInfoBean folderInfoBean = new FolderInfoBean();

		folderInfoBean.setId(id);
		folderInfoBean.setName(name);

		// 1. path에 폴더 생성
		File desti = new File(path + name);
		desti.mkdirs();

		FileControler fc = new FileControler();
		ArrayList<FolderInfoBean> childrenFolders = folderInfoDAO.getDBFolderChildrenList(id);
		ArrayList<FileInfoBean> childrenFiles = fc.getFiles(id);

		if (childrenFiles != null) {
			for (int i = 0; i < childrenFiles.size(); i++) {
				// 2. path+폴더 이름 으로 파일 생성
				fc.storeFile(childrenFiles.get(i).getName(), fc.readFile(childrenFiles.get(i).getId()),
						path + name + "/");
			}
		}

		if (childrenFolders != null) {
			for (int i = 0; i < childrenFolders.size(); i++) {
				exportFolder(childrenFolders.get(i).getId(), childrenFolders.get(i).getName(), path + name + "/",
						rootID);
			}
		}

		// 마지막 rootID와 현재 id가 같으면 압축실행.
		if (rootID.equals(id)) {
			try {
				zipFolder(path + name, path + name + ".zip");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				System.out.println("root folder zip fail!");
				return false;
			}
		}

		return true;
	}

	public void zipFolder(String srcFolder, String destZipFile) throws Exception {
		ZipOutputStream zip = null;
		FileOutputStream fileWriter = null;

		fileWriter = new FileOutputStream(destZipFile);
		zip = new ZipOutputStream(fileWriter);

		addFolderToZip("", srcFolder, zip);
		zip.flush();
		zip.close();
	}

	private void addFileToZip(String path, String srcFile, ZipOutputStream zip) throws Exception {

		File folder = new File(srcFile);
		if (folder.isDirectory()) {
			addFolderToZip(path, srcFile, zip);
		} else {
			byte[] buf = new byte[1024];
			int len;
			FileInputStream in = new FileInputStream(srcFile);
			zip.putNextEntry(new ZipEntry(path + "/" + folder.getName()));
			while ((len = in.read(buf)) > 0) {
				zip.write(buf, 0, len);
			}
		}
	}

	private void addFolderToZip(String path, String srcFolder, ZipOutputStream zip) throws Exception {
		File folder = new File(srcFolder);

		for (String fileName : folder.list()) {
			if (path.equals("")) {
				addFileToZip(folder.getName(), srcFolder + "/" + fileName, zip);
			} else {
				addFileToZip(path + "/" + folder.getName(), srcFolder + "/" + fileName, zip);
			}
		}
	}

	public String getNowDate() {
		return new SimpleDateFormat("yyyyMMddHHmmss", Locale.KOREA).format(new Date());
	}

	public boolean checkOverlappingName(FolderInfoBean folderInfoBean) {
		return folderInfoDAO.checkOverlappingName(folderInfoBean);
	}

	public ArrayList<FolderInfoBean> searchFolder(String owner, String clue) {
		return folderInfoDAO.searchFolder(owner, clue);
	}

}

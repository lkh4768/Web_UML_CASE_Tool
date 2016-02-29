package waut.controler;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

import javax.servlet.ServletContext;

import org.apache.tomcat.util.codec.binary.Base64;

import waut.bean.FileInfoBean;
import waut.bean.FolderInfoBean;
import waut.bean.LogInfoBean;
import waut.dao.FileInfoDAO;

public class FileControler {
	public static final String FILEROOTPATH = "/var/www/html/";

	private FileInfoDAO fileInfoDAO = new FileInfoDAO();

	public boolean checkTrash(String ownerID) {
		return fileInfoDAO.checkDBDelete(ownerID);
	}

	public ArrayList<FileInfoBean> getFiles(String parentID) {
		return fileInfoDAO.getDBFileList(parentID);
	}

	public ArrayList<FileInfoBean> getFilesInTrash(String owner) {
		return fileInfoDAO.getDBFileListInTrash(owner);
	}

	public FileInfoBean getFile(String fileID) {
		return fileInfoDAO.getDBFile(fileID);
	}

	public FileInfoBean addFile(String name, String ownerID, String modifierID, String content, String parentId,
			String sharedRootID, boolean isFile) {

		FileInfoBean fileInfoBean = new FileInfoBean(name, ownerID, modifierID, getNowDate(), parentId, sharedRootID);

		FileInfoBean afterFileInfoBean = null;
		// 이름 확인
		if (checkOverlappingName(fileInfoBean, isFile)) {
			// db 삽입
			if (fileInfoDAO.insertDB(fileInfoBean)) {

				// db에 삽입된 파일 id 가져오기 위해 getDB
				afterFileInfoBean = fileInfoDAO.getDBByNameAndParentID(parentId, name);

				if (afterFileInfoBean != null) {

					// server에 파일 생성
					if (!(storeFile(afterFileInfoBean.getId(), content, null))) {
						return null;
					} else {
						// ********log에 생성 등록!!
						LogInfoControler lic = new LogInfoControler();
						if (lic.addLog(afterFileInfoBean.getModifierID(), afterFileInfoBean.getId(),
								afterFileInfoBean.getDate(), LogInfoBean.CREATE) == null) {
							System.out.println("addLog in file controler fail!!!");
							return null;
						} else
							return afterFileInfoBean;
					}

				} else {
					return null;
				}

			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	public boolean renameFile(String id, String name, String parentID) {
		FileInfoBean fileInfoBean = new FileInfoBean();

		fileInfoBean.setId(id);
		fileInfoBean.setName(name);
		fileInfoBean.setParentID(parentID);
		fileInfoBean.setDate(getNowDate());

		if (checkOverlappingName(fileInfoBean, true))
			return fileInfoDAO.updateDBName(fileInfoBean);

		return false;
	}

	public boolean moveToTrashFile(String id) {
		FileInfoBean fileInfoBean = new FileInfoBean();

		fileInfoBean.setId(id);
		fileInfoBean.setDate(getNowDate());
		fileInfoBean.setDelete(true);
		// isDelete을 1로 update
		if (fileInfoDAO.updateDBDelete(fileInfoBean)) {
			return true;
		} else {
			return false;
		}

	}

	public boolean moveFile(String id, String name, String parentID, String ownerID, String modifierID,
			String sharedRootID, boolean isFile) {
		FileInfoBean fileInfoBean = new FileInfoBean();

		fileInfoBean.setId(id);
		fileInfoBean.setName(name);
		fileInfoBean.setDate(getNowDate());
		fileInfoBean.setParentID(parentID);
		fileInfoBean.setOwnerID(ownerID);
		fileInfoBean.setModifierID(modifierID);
		fileInfoBean.setSharedRootID(sharedRootID);

		// 이름 확인
		if (checkOverlappingName(fileInfoBean, isFile)) {
			return fileInfoDAO.updateDBPath(fileInfoBean);
		} else {
			return false;
		}
	}

	public boolean deleteFile(String id) {
		LogInfoControler lic = new LogInfoControler();
		ArrayList<LogInfoBean> logInfoBeanList = lic.getLogList(id);

		// 해당 로그 파일(서버) 삭제.
		for (int i = 0; i < logInfoBeanList.size(); i++) {
			if (logInfoBeanList.get(i).getContent() == LogInfoBean.UPDATE)
				removeFile(logInfoBeanList.get(i).getId());
		}

		if (fileInfoDAO.deleteDB(id)) {
			return removeFile(id);
		} else {
			return false;
		}
	}

	public boolean resotreFile(String id, String name, String parentID) {
		FileInfoBean fileInfoBean = new FileInfoBean();

		fileInfoBean.setId(id);
		fileInfoBean.setName(name);
		fileInfoBean.setParentID(parentID);
		fileInfoBean.setDate(getNowDate());
		fileInfoBean.setDelete(false);

		if (checkOverlappingName(fileInfoBean, true)) {
			// isDelete을 0로 update
			if (fileInfoDAO.updateDBDelete(fileInfoBean)) {
				return true;
			} else {
				return false;
			}
		} else
			return false;
	}

	public FileInfoBean copyFile(String oldID, String name, String parentID, String ownerID, String modifierID,
			String sharedRootID, boolean isFile) {
		String content = readFile(oldID);

		if (content.equals("")) {
			content = "[]";
		}

		return addFile(name, ownerID, modifierID, content, parentID, sharedRootID, isFile);
	}

	public boolean moveEditorView(String id, String modifierID) {
		FileInfoBean fileInfoBean = new FileInfoBean();
		LogInfoControler logInfoControler = new LogInfoControler();

		fileInfoBean.setId(id);
		fileInfoBean.setDate(getNowDate());
		fileInfoBean.setLock(true);

		// isLock을 update
		if (fileInfoDAO.updateDBLock(fileInfoBean)) {
			// 로그에 조회 등록
			if (logInfoControler.addLog(modifierID, fileInfoBean.getId(), fileInfoBean.getDate(),
					LogInfoBean.READ) == null)
				return false;
			else
				return true;
		} else {
			return false;
		}

	}

	public void unlockFile(String[] unlockFileIDList) {
		fileInfoDAO.updateDBListLock(unlockFileIDList);
	}

	public boolean lockFile(String id, String date) {
		FileInfoBean fib = new FileInfoBean();

		fib.setId(id);
		fib.setDate(date);
		fib.setLock(true);

		return fileInfoDAO.updateDBLock(fib);
	}

	public boolean updateModifierID(FileInfoBean fileInfoBean) {
		return fileInfoDAO.updateDBModifierID(fileInfoBean);
	}

	public boolean exportFile(String id, String name, String tmpPath) {
		String content = readFile(id);

		if (content.equals("")) {
			return false;
		}

		return storeFile(name, content, tmpPath);
	}

	private String getNowDate() {
		String now = new SimpleDateFormat("yyyyMMddHHmmss", Locale.KOREA).format(new Date());
		return now;
	}

	public boolean checkOverlappingName(FileInfoBean fileInfoBean, boolean isFile) {

		// 이동, 복사의 주체가 파일이 아니라 폴더라면 이름 검사를 안하게 설정
		if (isFile == false) {
			return true;
		}

		return fileInfoDAO.checkOverlappingName(fileInfoBean);
	}

	// **SAO***//
	private boolean removeFile(String name) {
		File file = new File(FILEROOTPATH + name + ".wml");
		File img = new File(FILEROOTPATH + name + ".png");

		if (file.delete()) {
			img.delete();
			return true;
		} else
			return false;
	}

	public String readFile(String name) {
		String content = "";

		try (BufferedReader br = new BufferedReader(new FileReader(FILEROOTPATH + name + ".wml"))) {

			String sCurrentLine;

			while ((sCurrentLine = br.readLine()) != null) {
				content = content + sCurrentLine;
			}

		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("readFile fail!");
		}

		return content;
	}

	public boolean storeFile(String name, String content, String path) {
		PrintWriter writer = null;

		try {
			if (path == null)
				writer = new PrintWriter(FILEROOTPATH + name + ".wml", "UTF-8");
			else
				writer = new PrintWriter(path + name + ".wml", "UTF-8");
			writer.println(content);
			writer.close();
		} catch (FileNotFoundException | UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("storeFile fail!!!");
			return false;
		}

		return true;
	}

	public boolean storePngFile(String name, String content) {
		try {
			Base64 decoder = new Base64();
			byte[] imgBytes = decoder.decode(content);
			FileOutputStream osf;
			osf = new FileOutputStream(new File(FILEROOTPATH + name + ".png"));
			osf.write(imgBytes);
			osf.flush();

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}

	public String readPngToBase64(String name) {
		byte[] imageData = null;

		try {
			File file = new File(FILEROOTPATH + name + ".png");
			FileInputStream imageInFile = new FileInputStream(file);
			imageData = new byte[(int) file.length()];

			imageInFile.read(imageData);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// Converting Image byte array into Base64 String
		String imageDataString = Base64.encodeBase64URLSafeString(imageData);

		return imageDataString;
	}

	public void setSharedRoot(String rootID, String id) {
		fileInfoDAO.updateSharedRootID(rootID, id);
	}
	public ArrayList<FileInfoBean> searchFile(String owner, String clue){
		return fileInfoDAO.searchFile(owner, clue);
	}

}

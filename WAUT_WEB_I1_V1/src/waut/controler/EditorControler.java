package waut.controler;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.util.Streams;

import waut.bean.FileInfoBean;
import waut.bean.LogInfoBean;

public class EditorControler {

	public FileInfoBean openFile(String fileID, String fileModifierID) {
		/*
		 * 1. log에 조회 추가 2. file에 lock true 설정 3. getFileInfo 4. return fileInfo
		 */

		LogInfoControler lic = new LogInfoControler();
		FileControler fc = new FileControler();
		String nowData = getNowDate();

		if (lic.addLog(fileModifierID, fileID, nowData, LogInfoBean.READ) != null) {
			if (fc.lockFile(fileID, nowData)) {
				return fc.getFile(fileID);
			} else
				return null;
		} else
			return null;
	}

	public String readFile(String fileID) {
		FileControler fc = new FileControler();

		return fc.readFile(fileID);
	}

	public FileInfoBean saveAsFile(String fileName, String fileOwnerID, String fileModifierID, String fileParentID,
			String fileSharedRootID, String fileContent, String fileImg) {
		/*
		 * 1. 파일 생성 2. 기존 파일 저장
		 */
		FileControler fc = new FileControler();

		FileInfoBean fib = fc.addFile(fileName, fileOwnerID, fileModifierID, fileContent, fileParentID,
				fileSharedRootID, true);

		if (fib != null) {
			return saveFile(fib.getId(), fib.getOwnerID(), fib.getModifierID(), fib.getParentID(), fileContent,
					fileImg);
		} else {
			System.out.println("saveasfile null");
			return null;
		}
	}

	public FileInfoBean saveFile(String fileID, String fileOwnerID, String fileModifierID, String fileParentID,
			String fileContent, String fileImg) {
		/*
		 * 1. modifier 업데이트 2. log에 update 추가(return logID) 3. fileID 이름으로 wml
		 * 파일 저장 4. fileID 이름으로 png 파일 저장 5. logID 이름으로 wml 파일 저장 6. logID 이름으로
		 * png 파일 저장
		 */

		FileInfoBean fib = new FileInfoBean();
		fib.setId(fileID);
		fib.setOwnerID(fileOwnerID);
		fib.setModifierID(fileModifierID);
		fib.setParentID(fileParentID);
		fib.setDate(getNowDate());

		FileControler fc = new FileControler();
		LogInfoControler lic = new LogInfoControler();

		if (fc.updateModifierID(fib)) {
			LogInfoBean lib = lic.addLog(fileModifierID, fileID, fib.getDate(), LogInfoBean.UPDATE);
			if (lib == null)
				return null;
			else {
				if (fc.storeFile(fileID, fileContent, null) & fc.storePngFile(fileID, fileImg)
						& fc.storeFile(lib.getId(), fileContent, null) & fc.storePngFile(lib.getId(), fileImg)) {
					return fc.getFile(fileID);
				} else
					return null;
			}
		} else
			return null;

	}

	public String importFile(List items) {
		String result = "";

		try {
			for (int i = 0; i < items.size(); i++) {
				FileItem item = (FileItem) items.get(i);

				String fileName = item.getName();
				InputStream content;

				content = item.getInputStream();
				// Do whatever with the content InputStream.
				result = result + Streams.asString(content);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	public void unlockFile(String fileIDStr) {
		FileControler fc = new FileControler();

		String[] fileIDList = fileIDStr.split(";");
		fc.unlockFile(fileIDList);
	}

	private String getNowDate() {
		String now = new SimpleDateFormat("yyyyMMddHHmmss", Locale.KOREA).format(new Date());
		return now;
	}
}

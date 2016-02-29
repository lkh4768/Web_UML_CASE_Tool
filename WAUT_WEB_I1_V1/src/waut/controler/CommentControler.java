package waut.controler;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

import waut.bean.CommentInfoBean;
import waut.dao.CommentInfoDAO;
import waut.dao.FileInfoDAO;

public class CommentControler {

	private CommentInfoDAO commentInfoDAO = new CommentInfoDAO();

	public CommentInfoBean addComment(String fileID, String ownerID, String comment) {
		CommentInfoBean cib = new CommentInfoBean(fileID, getNowDate(), ownerID, comment);

		if (commentInfoDAO.insertDB(cib)) {
			return commentInfoDAO.getDB(cib);
		} else
			return null;
	}

	public ArrayList<CommentInfoBean> getCommentList(String fileID) {
		return commentInfoDAO.getDBList(fileID);
	}

	public boolean deleteComment(String id) {
		return commentInfoDAO.deleteDB(id);
	}
	
	public boolean modifyComment(String id, String comment) {
		CommentInfoBean cib = new CommentInfoBean();
		
		cib.setId(id);
		cib.setComment(comment);
		cib.setDate(getNowDate());
		
		return commentInfoDAO.updateDB(cib);
	}

	private String getNowDate() {
		String now = new SimpleDateFormat("yyyyMMddHHmmss", Locale.KOREA).format(new Date());
		return now;
	}
}

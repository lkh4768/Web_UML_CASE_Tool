package waut.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import waut.bean.CommentInfoBean;
import waut.bean.FileInfoBean;

public class CommentInfoDAO {
	private DBConnection db;
	private PreparedStatement pstmt = null;

	public CommentInfoDAO() {
		db = DBConnection.getDBInstance();
	}

	public CommentInfoBean getDB(CommentInfoBean commentInfoBean) {
		db.connect();

		String sql = "SELECT * FROM comment_info INNER JOIN user_info ON comment_info.comment_owner=user_info.user_id WHERE "
				+ "comment_file_id=? AND comment_owner=? AND comment_date=? AND comment_content=?";

		CommentInfoBean cib = null;

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, commentInfoBean.getFileID());
			pstmt.setString(2, commentInfoBean.getOwnerID());
			pstmt.setString(3, commentInfoBean.getDate());
			pstmt.setString(4, commentInfoBean.getComment());
			ResultSet rs = pstmt.executeQuery();

			rs.next();
			cib = new CommentInfoBean();
			cib.setId(rs.getString("comment_id"));
			cib.setFileID(rs.getString("comment_file_id"));
			cib.setOwnerID(rs.getString("comment_owner"));
			cib.setOwnerName(rs.getString("user_name"));
			cib.setDate(rs.getTimestamp("comment_date").toString());
			cib.setComment(rs.getString("comment_content"));

			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("CommentInfoDAO getDB fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return cib;
	}

	public boolean insertDB(CommentInfoBean commentInfoBean) {
		db.connect();

		String sql = "INSERT INTO `comment_info`(`comment_id`, `comment_file_id`, `comment_owner`, `comment_date`, `comment_content`) VALUES (UUID(),?,?,?,?);";
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, commentInfoBean.getFileID());
			pstmt.setString(2, commentInfoBean.getOwnerID());
			pstmt.setString(3, commentInfoBean.getDate());
			pstmt.setString(4, commentInfoBean.getComment());
			pstmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("CommentInfoDAO insertDB Fail!!");
			return false;
		} finally {
			db.disconnect();
		}
		return true;
	}

	public ArrayList<CommentInfoBean> getDBList(String fileID) {
		db.connect();
		ArrayList<CommentInfoBean> commentInfoBeanList = new ArrayList<CommentInfoBean>();
		String sql = "SELECT * FROM comment_info INNER JOIN user_info ON comment_info.comment_owner=user_info.user_id WHERE comment_file_id=?;";
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, fileID);
			ResultSet rs = pstmt.executeQuery();

			while (rs.next()) {
				CommentInfoBean cib = new CommentInfoBean();

				cib.setId(rs.getString("comment_id"));
				cib.setFileID(rs.getString("comment_file_id"));
				cib.setOwnerID(rs.getString("comment_owner"));
				cib.setOwnerName(rs.getString("user_name"));
				cib.setDate(rs.getTimestamp("comment_date").toString());
				cib.setComment(rs.getString("comment_content"));
				commentInfoBeanList.add(cib);
			}

			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getDBFileList fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return commentInfoBeanList;
	}

	// DB에서 제거하는 부분
	public boolean deleteDB(String id) {
		db.connect();

		String sql = "DELETE FROM comment_info WHERE comment_id=?";

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, id);
			pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} finally {
			db.disconnect();
		}
		return true;
	}

	// DB업데이트 하는 부분
	public boolean updateDB(CommentInfoBean commentInfoBean) {
		db.connect();
		String sql;
		sql = "UPDATE comment_info SET comment_date=?, comment_content=? WHERE comment_id=?";

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, commentInfoBean.getDate());
			pstmt.setString(2, commentInfoBean.getComment());
			pstmt.setString(3, commentInfoBean.getId());
			pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} finally {
			db.disconnect();
		}
		return true;
	}
}

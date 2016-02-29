package waut.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import waut.bean.CommentInfoBean;
import waut.bean.FileInfoBean;
import waut.bean.LogInfoBean;

public class LogInfoDAO {
	private DBConnection db;
	private PreparedStatement pstmt = null;

	public LogInfoDAO() {
		db = DBConnection.getDBInstance();
	}

	public ArrayList<LogInfoBean> getDBList(String fileID) {
		db.connect();

		ArrayList<LogInfoBean> logInfoBeanList = new ArrayList<LogInfoBean>();

		String sql = "SELECT * FROM log_info INNER JOIN user_info ON log_info.log_owner=user_info.user_id WHERE log_file_id=? ORDER BY log_info.log_date ASC;";

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, fileID);
			ResultSet rs = pstmt.executeQuery();

			while (rs.next()) {
				LogInfoBean lib = new LogInfoBean();

				lib.setId(rs.getString("log_id"));
				lib.setFileID(rs.getString("log_file_id"));
				lib.setOwnerID(rs.getString("log_owner"));
				lib.setOwnerName(rs.getString("user_name"));
				lib.setDate(rs.getTimestamp("log_date").toString());
				lib.setContent(rs.getInt("log_content"));
				logInfoBeanList.add(lib);
			}

			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getDBLogList fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return logInfoBeanList;
	}

	public boolean insertDB(LogInfoBean logInfoBean) {
		db.connect();

		String sql = "INSERT INTO `log_info`(`log_id`, `log_file_id`, `log_owner`, `log_date`, `log_content`) VALUES (UUID(),?,?,?,?);";

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, logInfoBean.getFileID());
			pstmt.setString(2, logInfoBean.getOwnerID());
			pstmt.setString(3, logInfoBean.getDate());
			pstmt.setInt(4, logInfoBean.getContent());
			pstmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("logInfoDAO inserDB Fail!!");
			return false;
		} finally {
			db.disconnect();
		}
		return true;
	}

	public LogInfoBean getDBByLogInfoBean(LogInfoBean logInfoBean) {
		db.connect();
		LogInfoBean lib = new LogInfoBean();
		String sql = "SELECT * FROM log_info INNER JOIN user_info ON log_info.log_owner=user_info.user_id WHERE log_file_id=? AND log_owner=? AND log_date=? AND log_content=?;";

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, logInfoBean.getFileID());
			pstmt.setString(2, logInfoBean.getOwnerID());
			pstmt.setString(3, logInfoBean.getDate());
			pstmt.setInt(4, logInfoBean.getContent());
			ResultSet rs = pstmt.executeQuery();

			rs.next();

			lib.setId(rs.getString("log_id"));
			lib.setFileID(rs.getString("log_file_id"));
			lib.setOwnerID(rs.getString("log_owner"));
			lib.setOwnerName(rs.getString("user_name"));
			lib.setDate(rs.getTimestamp("log_date").toString());
			lib.setContent(rs.getInt("log_content"));

			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getDBLogList fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return lib;
	}
}

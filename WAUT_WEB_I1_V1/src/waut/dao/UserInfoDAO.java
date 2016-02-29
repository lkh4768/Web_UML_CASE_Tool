package waut.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import waut.bean.UserInfoBean;

public class UserInfoDAO {
	private DBConnection db;
	private PreparedStatement pstmt = null;

	public UserInfoDAO() {
		db = DBConnection.getDBInstance();
	}

	// 아이디 비밀번호 확인 부분
	public UserInfoBean getDBByIdAndPw(String id, String pw) {
		db.connect();

		String sql = "SELECT * FROM user_info WHERE user_id=? AND user_pw=md5(?);";
		UserInfoBean userInfo = new UserInfoBean();
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, id);
			pstmt.setString(2, pw);
			ResultSet rs = pstmt.executeQuery();

			rs.next();
			userInfo.setId(rs.getString("user_id"));
			userInfo.setEmail(rs.getString("user_email"));
			userInfo.setName(rs.getString("user_name"));
			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		} finally {
			db.disconnect();
		}
		return userInfo;
	}

	// 아이디 찾는 부분
	public boolean selectDBByID(String id) {
		db.connect();

		String sql = "SELECT * FROM user_info WHERE user_id=?;";
		int count = 0;

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, id);
			ResultSet rs = pstmt.executeQuery();

			rs.last();
			count = rs.getRow();
			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			db.disconnect();
		}

		if (count == 0)
			return false;
		else
			return true;
	}

	// 비상이메일 찾는 부분
	public UserInfoBean getDBByEmergencyEmail(String email) {
		db.connect();

		String sql = "SELECT * FROM user_info WHERE user_email=?;";
		UserInfoBean userInfo = new UserInfoBean();

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, email);
			ResultSet rs = pstmt.executeQuery();

			rs.next();
			userInfo.setId(rs.getString("user_id"));
			userInfo.setEmail(rs.getString("user_email"));
			userInfo.setName(rs.getString("user_name"));
			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		} finally {
			db.disconnect();
		}
		return userInfo;
	}

	// DB에 넣는 부분
	public boolean insertDB(UserInfoBean userInfoBean) {
		db.connect();
		String sql;
		sql = "insert into user_info values(?,md5(?),?,?)";

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, userInfoBean.getId());
			pstmt.setString(2, userInfoBean.getPw());
			pstmt.setString(3, userInfoBean.getEmail());
			pstmt.setString(4, userInfoBean.getName());

			pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} finally {
			db.disconnect();
		}
		return true;
	}

	// DB에서 제거하는 부분
	public boolean deleteDB(String id) {
		db.connect();

		String sql = "delete from user_info where user_id=?";

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
	public boolean updateDB(UserInfoBean userInfoBean) {
		db.connect();
		String sql = null;
		if (userInfoBean.getPw() != "")
			sql = "UPDATE user_info SET user_pw=md5(?), user_email=?, user_name=? WHERE user_id=?";
		else
			sql = "UPDATE user_info SET user_email=?, user_name=? WHERE user_id=?";
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			if (userInfoBean.getPw() != "") {
				pstmt.setString(1, userInfoBean.getPw());
				pstmt.setString(2, userInfoBean.getEmail());
				pstmt.setString(3, userInfoBean.getName());
				pstmt.setString(4, userInfoBean.getId());
			} else {
				pstmt.setString(1, userInfoBean.getEmail());
				pstmt.setString(2, userInfoBean.getName());
				pstmt.setString(3, userInfoBean.getId());
			}
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
	public boolean updateDBPw(String emergencyEmail, String pw) {
		db.connect();
		String sql = "UPDATE user_info SET user_pw=md5(?) WHERE user_email=?";
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, pw);
			pstmt.setString(2, emergencyEmail);

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

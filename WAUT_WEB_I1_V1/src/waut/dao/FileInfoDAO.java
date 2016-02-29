package waut.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import waut.bean.CommentInfoBean;
import waut.bean.FileInfoBean;
import waut.bean.FolderInfoBean;

public class FileInfoDAO {
	private DBConnection db;
	private PreparedStatement pstmt = null;

	public FileInfoDAO() {
		db = DBConnection.getDBInstance();
	}

	public boolean checkDBDelete(String ownerID) {
		db.connect();
		String sql = "SELECT file_name FROM file_info WHERE file_owner = ? AND file_delete = ?;";
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, ownerID);
			pstmt.setBoolean(2, true);
			ResultSet rs = pstmt.executeQuery();

			ArrayList<String> list = new ArrayList<String>();

			while (rs.next()) {
				list.add(rs.getString("file_name"));
			}
			if (list.size() != 0) {
				return true;
			} else {
				return false;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} finally {
			db.disconnect();
		}
	}

	public ArrayList<FileInfoBean> getDBFileList(String parentID) {
		db.connect();
		ArrayList<FileInfoBean> files = new ArrayList<FileInfoBean>();

		String sql = "SELECT f.file_id 'id', f.file_name 'name', f.file_owner 'ownerID', u1.user_name 'ownerName', f.file_modifier 'modifierID', u2.user_name 'modifierName', f.file_date 'date', f.file_delete 'isDelete', f.file_lock 'isLock', f.file_parent_id 'parentID', f.file_shared_root_id 'sharedRootID'"
				+ " FROM file_info f" + " INNER JOIN user_info u1 ON f.file_owner = u1.user_id"
				+ " INNER JOIN user_info u2 ON f.file_modifier = u2.user_id WHERE file_parent_id=? AND file_delete=?;";

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, parentID);
			pstmt.setBoolean(2, false);
			ResultSet rs = pstmt.executeQuery();

			while (rs.next()) {
				FileInfoBean fileInfoBean = new FileInfoBean();

				fileInfoBean.setId(rs.getString("id"));
				fileInfoBean.setName(rs.getString("name"));
				fileInfoBean.setOwnerID(rs.getString("ownerID"));
				fileInfoBean.setOwnerName(rs.getString("ownerName"));
				fileInfoBean.setModifierID(rs.getString("modifierID"));
				fileInfoBean.setModifierName(rs.getString("modifierName"));
				fileInfoBean.setDate(rs.getTimestamp("date").toString());
				fileInfoBean.setDelete(rs.getBoolean("isDelete"));
				fileInfoBean.setLock(rs.getBoolean("isLock"));
				fileInfoBean.setParentID(rs.getString("parentID"));
				fileInfoBean.setSharedRootID(rs.getString("sharedRootID"));
				files.add(fileInfoBean);

			}

			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getDBFileList fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return files;

	}

	public ArrayList<FileInfoBean> getDBFileListInTrash(String owner) {
		db.connect();
		ArrayList<FileInfoBean> files = new ArrayList<FileInfoBean>();

		String sql = "SELECT f.file_id 'id', f.file_name 'name', f.file_owner 'ownerID', u1.user_name 'ownerName', f.file_modifier 'modifierID', u2.user_name 'modifierName', f.file_date 'date', f.file_delete 'isDelete', f.file_lock 'isLock', f.file_parent_id 'parentID', f.file_shared_root_id 'sharedRootID'"
				+ " FROM file_info f" + " INNER JOIN user_info u1 ON f.file_owner = u1.user_id"
				+ " INNER JOIN user_info u2 ON f.file_modifier = u2.user_id WHERE file_owner=? AND file_delete=?;";

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, owner);
			pstmt.setBoolean(2, true);
			ResultSet rs = pstmt.executeQuery();

			while (rs.next()) {
				FileInfoBean fileInfoBean = new FileInfoBean();

				fileInfoBean.setId(rs.getString("id"));
				fileInfoBean.setName(rs.getString("name"));
				fileInfoBean.setOwnerID(rs.getString("ownerID"));
				fileInfoBean.setOwnerName(rs.getString("ownerName"));
				fileInfoBean.setModifierID(rs.getString("modifierID"));
				fileInfoBean.setModifierName(rs.getString("modifierName"));
				fileInfoBean.setDate(rs.getTimestamp("date").toString());
				fileInfoBean.setDelete(rs.getBoolean("isDelete"));
				fileInfoBean.setLock(rs.getBoolean("isLock"));
				fileInfoBean.setParentID(rs.getString("parentID"));
				fileInfoBean.setSharedRootID(rs.getString("sharedRootID"));
				files.add(fileInfoBean);

			}

			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getDBFileList fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return files;

	}

	public FileInfoBean getDBByNameAndParentID(String parentID, String name) {
		db.connect();

		String sql = "SELECT f.file_id 'id', f.file_name 'name', f.file_owner 'ownerID', u1.user_name 'ownerName', f.file_modifier 'modifierID', u2.user_name 'modifierName', f.file_date 'date', f.file_delete 'isDelete', f.file_lock 'isLock', f.file_parent_id 'parentID', f.file_shared_root_id 'sharedRootID'"
				+ " FROM file_info f" + " INNER JOIN user_info u1 ON f.file_owner = u1.user_id"
				+ " INNER JOIN user_info u2 ON f.file_modifier = u2.user_id WHERE file_parent_id=? AND file_name =?;";
		FileInfoBean fileInfoBean = new FileInfoBean();
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, parentID);
			pstmt.setString(2, name);
			ResultSet rs = pstmt.executeQuery();

			rs.next();

			fileInfoBean.setId(rs.getString("id"));
			fileInfoBean.setName(rs.getString("name"));
			fileInfoBean.setOwnerID(rs.getString("ownerID"));
			fileInfoBean.setOwnerName(rs.getString("ownerName"));
			fileInfoBean.setModifierID(rs.getString("modifierID"));
			fileInfoBean.setModifierName(rs.getString("modifierName"));
			fileInfoBean.setDate(rs.getTimestamp("date").toString());
			fileInfoBean.setDelete(rs.getBoolean("isDelete"));
			fileInfoBean.setLock(rs.getBoolean("isLock"));
			fileInfoBean.setParentID(rs.getString("parentID"));
			fileInfoBean.setSharedRootID(rs.getString("sharedRootID"));

			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getDBByNameAndParentID fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return fileInfoBean;
	}

	public boolean insertDB(FileInfoBean fileInfoBean) {
		db.connect();

		String sql = "INSERT INTO `file_info` (`file_id`, `file_name`, `file_owner`, `file_modifier`,`file_date`, `file_parent_id`, `file_shared_root_id`) VALUES (UUID(), ?,?,?,?,?,?);";
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, fileInfoBean.getName());
			pstmt.setString(2, fileInfoBean.getOwnerID());
			pstmt.setString(3, fileInfoBean.getModifierID());
			pstmt.setString(4, fileInfoBean.getDate());
			pstmt.setString(5, fileInfoBean.getParentID());
			pstmt.setString(6, fileInfoBean.getSharedRootID());
			pstmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("filInfoDAO inserDB Fail!!");
			return false;
		} finally {
			db.disconnect();
		}
		return true;
	}

	public boolean checkOverlappingName(FileInfoBean fileInfoBean) {
		boolean isUniqueName = false;
		db.connect();

		String sql = "SELECT file_name FROM file_info WHERE file_parent_id = ? AND file_name = ? AND file_delete = ?;";
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, fileInfoBean.getParentID());
			pstmt.setString(2, fileInfoBean.getName());
			pstmt.setBoolean(3, false);
			ResultSet rs = pstmt.executeQuery();
			ArrayList<String> list = new ArrayList<String>();
			while (rs.next()) {
				list.add(rs.getString("file_name"));
			}
			if (list.size() != 0) {
				isUniqueName = false;
			} else {
				isUniqueName = true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			db.disconnect();
		}

		return isUniqueName;
	}

	// DB업데이트 하는 부분
	public boolean updateDBName(FileInfoBean fileInfoBean) {
		db.connect();
		String sql;
		sql = "UPDATE file_info SET file_name=?, file_date=? WHERE file_id=?";

		try {
			pstmt = db.getConnection().prepareStatement(sql);

			pstmt.setString(1, fileInfoBean.getName());
			pstmt.setString(2, fileInfoBean.getDate());
			pstmt.setString(3, fileInfoBean.getId());

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
	public boolean updateDBDelete(FileInfoBean fileInfoBean) {
		db.connect();
		String sql;
		sql = "UPDATE file_info SET file_delete=?, file_date=? WHERE file_id=?";

		try {
			pstmt = db.getConnection().prepareStatement(sql);

			pstmt.setBoolean(1, fileInfoBean.isDelete());
			pstmt.setString(2, fileInfoBean.getDate());
			pstmt.setString(3, fileInfoBean.getId());

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
	public boolean updateDBPath(FileInfoBean fileInfoBean) {
		db.connect();
		String sql = "UPDATE file_info SET file_name=?, file_date=?, file_parent_id=?, file_owner=?, file_modifier=?, file_shared_root_id=? WHERE file_id=?";

		try {
			pstmt = db.getConnection().prepareStatement(sql);

			pstmt.setString(1, fileInfoBean.getName());
			pstmt.setString(2, fileInfoBean.getDate());
			pstmt.setString(3, fileInfoBean.getParentID());
			pstmt.setString(4, fileInfoBean.getOwnerID());
			pstmt.setString(5, fileInfoBean.getModifierID());
			pstmt.setString(6, fileInfoBean.getSharedRootID());
			pstmt.setString(7, fileInfoBean.getId());

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

		String sql = "DELETE FROM file_info WHERE file_id=?";

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
	public boolean updateDBLock(FileInfoBean fileInfoBean) {
		db.connect();
		String sql;
		sql = "UPDATE file_info SET file_lock=?, file_date=? WHERE file_id=?";

		try {
			pstmt = db.getConnection().prepareStatement(sql);

			pstmt.setBoolean(1, fileInfoBean.isLock());
			pstmt.setString(2, fileInfoBean.getDate());
			pstmt.setString(3, fileInfoBean.getId());

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
	public boolean updateDBListLock(String[] unlockFileIDList) {
		db.connect();
		String sql = "UPDATE file_info SET file_lock=? WHERE";
		String sqlWhere = "";
		for (int i = 1; i < unlockFileIDList.length; i++) {
			sqlWhere = sqlWhere + " file_id=? OR";
		}

		sqlWhere = sqlWhere.substring(0, sqlWhere.length() - 3);

		sql = sql + sqlWhere;

		try {
			pstmt = db.getConnection().prepareStatement(sql);

			pstmt.setBoolean(1, false);
			for (int i = 1; i < unlockFileIDList.length; i++) {
				pstmt.setString(i + 1, unlockFileIDList[i]);
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
	public boolean updateDBModifierID(FileInfoBean fileInfoBean) {
		db.connect();
		String sql;
		sql = "UPDATE file_info SET file_modifier=?, file_date=? WHERE file_id=?";

		try {
			pstmt = db.getConnection().prepareStatement(sql);

			pstmt.setString(1, fileInfoBean.getModifierID());
			pstmt.setString(2, fileInfoBean.getDate());
			pstmt.setString(3, fileInfoBean.getId());

			pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} finally {
			db.disconnect();
		}
		return true;
	}

	public FileInfoBean getDBFile(String fileID) {
		db.connect();
		FileInfoBean fileInfoBean = new FileInfoBean();

		String sql = "SELECT f.file_id 'id', f.file_name 'name', f.file_owner 'ownerID', u1.user_name 'ownerName', f.file_modifier 'modifierID', u2.user_name 'modifierName', f.file_date 'date', f.file_delete 'isDelete', f.file_lock 'isLock', f.file_parent_id 'parentID', f.file_shared_root_id 'sharedRootID'"
				+ " FROM file_info f" + " INNER JOIN user_info u1 ON f.file_owner = u1.user_id"
				+ " INNER JOIN user_info u2 ON f.file_modifier = u2.user_id WHERE file_id=?;";

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, fileID);
			ResultSet rs = pstmt.executeQuery();

			rs.next();

			fileInfoBean.setId(rs.getString("id"));
			fileInfoBean.setName(rs.getString("name"));
			fileInfoBean.setOwnerID(rs.getString("ownerID"));
			fileInfoBean.setOwnerName(rs.getString("ownerName"));
			fileInfoBean.setModifierID(rs.getString("modifierID"));
			fileInfoBean.setModifierName(rs.getString("modifierName"));
			fileInfoBean.setDate(rs.getTimestamp("date").toString());
			fileInfoBean.setDelete(rs.getBoolean("isDelete"));
			fileInfoBean.setLock(rs.getBoolean("isLock"));
			fileInfoBean.setParentID(rs.getString("parentID"));
			fileInfoBean.setSharedRootID(rs.getString("sharedRootID"));

			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getDBFileList fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return fileInfoBean;

	}
	
	public boolean updateSharedRootID(String rootID, String id) {
		db.connect();
		
		String sql = "UPDATE file_info SET file_shared_root_id = ? WHERE file_id=?";
		
		try{
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, rootID);
			pstmt.setString(2, id);
			pstmt.executeUpdate();
		}catch (SQLException e) {
			e.printStackTrace();
			return false;
		} finally {
			db.disconnect();
		}
		return true;
	}
	
	// 검색한 폴더 찾기
		public ArrayList<FileInfoBean> searchFile(String userID, String clue){
			ArrayList<FileInfoBean> files = new ArrayList<FileInfoBean>();
			
			db.connect();
			
			String sql="SELECT * FROM file_info JOIN user_info ON file_info.file_owner=user_info.user_id WHERE (file_info.file_owner=?) AND (file_info.file_name LIKE ?) AND (file_info.file_delete=0);";
			
			try{
				pstmt = db.getConnection().prepareStatement(sql);
				pstmt.setString(1, userID);
				pstmt.setString(2, "%"+clue+"%");
				ResultSet rs = pstmt.executeQuery();
				
				while(rs.next()){

					FileInfoBean fileInfoBean = new FileInfoBean();
					fileInfoBean.setId(rs.getString("file_info.file_id"));
					fileInfoBean.setName(rs.getString("file_info.file_name"));
					fileInfoBean.setOwnerID(rs.getString("file_info.file_owner"));
					fileInfoBean.setOwnerName(rs.getString("user_info.user_name"));
					fileInfoBean.setModifierID(rs.getString("file_info.file_modifier"));
					fileInfoBean.setModifierName(rs.getString("user_info.user_name"));
					fileInfoBean.setDate(rs.getTimestamp("file_info.file_date").toString());
					fileInfoBean.setDelete(rs.getBoolean("file_info.file_delete"));
					fileInfoBean.setLock(rs.getBoolean("file_info.file_lock"));
					fileInfoBean.setParentID(rs.getString("file_info.file_parent_id"));
					fileInfoBean.setSharedRootID(rs.getString("file_info.file_shared_root_id"));
										
					files.add(fileInfoBean);
				}
				
			}catch(SQLException e){
				e.printStackTrace();
				System.out.println("error of the search files");
			}finally{
				db.disconnect();
			}
			return files;
		}
}

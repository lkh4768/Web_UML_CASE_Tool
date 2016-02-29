package waut.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;

import waut.bean.FileInfoBean;
import waut.bean.FolderInfoBean;

public class FolderInfoDAO {
	private DBConnection db;
	private PreparedStatement pstmt = null;

	public FolderInfoDAO() {
		db = DBConnection.getDBInstance();
	}

	public boolean checkDBDelete(String ownerID) {
		db.connect();
		String sql = "SELECT folder_name FROM folder_info WHERE folder_owner = ? AND folder_delete = ?;";
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, ownerID);
			pstmt.setBoolean(2, true);
			ResultSet rs = pstmt.executeQuery();

			ArrayList<String> list = new ArrayList<String>();

			while (rs.next()) {
				list.add(rs.getString("folder_name"));
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

	public ArrayList<FolderInfoBean> getDBFolderList(String folderParentID, String owner) {
		db.connect();
		ArrayList<FolderInfoBean> folders = new ArrayList<FolderInfoBean>();

		String sql = "SELECT * FROM folder_info INNER JOIN user_info ON folder_info.folder_owner=user_info.user_id WHERE folder_parent_id=? AND folder_owner=? AND folder_delete=?;";

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			
			pstmt.setString(1, folderParentID);
			pstmt.setString(2, owner);
			//pstmt.setString(3, sharedRootID);
			pstmt.setBoolean(3, false);
			ResultSet rs = pstmt.executeQuery();
			
			while (rs.next()) {

				FolderInfoBean folderInfoBean = new FolderInfoBean();

				folderInfoBean.setId(rs.getString("folder_id"));
				folderInfoBean.setName(rs.getString("folder_name"));
				folderInfoBean.setOwnerID(rs.getString("folder_owner"));
				folderInfoBean.setOwnerName(rs.getString("user_name"));
				folderInfoBean.setDate(rs.getDate("folder_date").toString());
				folderInfoBean.setDelete(rs.getBoolean("folder_delete"));
				folderInfoBean.setParentID(rs.getString("folder_parent_id"));
				folderInfoBean.setSharedRootID(rs.getString("folder_shared_root_id"));

				folders.add(folderInfoBean);

			}

			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getDBFolderList fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return folders;

	}

	public ArrayList<FolderInfoBean> getDBSharedRootFolderList(String id) {
		db.connect();
		ArrayList<FolderInfoBean> folders = new ArrayList<FolderInfoBean>();

		String sql = "SELECT *,user_info.user_name FROM share_info INNER JOIN folder_info ON share_info.share_shared_root_id=folder_info.folder_id INNER JOIN user_info ON user_info.user_id = folder_info.folder_owner WHERE share_info.share_member_id=? AND folder_info.folder_delete=0;";
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, id);
			ResultSet rs = pstmt.executeQuery();

			while (rs.next()) {
				FolderInfoBean folderInfoBean = new FolderInfoBean();

				folderInfoBean.setId(rs.getString("share_info.share_shared_root_id"));
				folderInfoBean.setName(rs.getString("folder_info.folder_name"));
				folderInfoBean.setOwnerID(rs.getString("folder_info.folder_owner"));
				folderInfoBean.setOwnerName(rs.getString("user_info.user_name"));
				folderInfoBean.setDate(rs.getDate("folder_info.folder_date").toString());
				folderInfoBean.setDelete(rs.getBoolean("folder_info.folder_delete"));
				folderInfoBean.setParentID("1");
				folderInfoBean.setSharedRootID("1");

				folders.add(folderInfoBean);

			}

			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getDBFolderList fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return folders;

	}

	public ArrayList<FolderInfoBean> getDBFolderListInTrash(String owner) {
		db.connect();
		ArrayList<FolderInfoBean> folders = new ArrayList<FolderInfoBean>();

		String sql = "SELECT * FROM folder_info INNER JOIN user_info ON folder_info.folder_owner=user_info.user_id WHERE folder_owner=? AND folder_delete=?;";

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, owner);
			pstmt.setBoolean(2, true);
			ResultSet rs = pstmt.executeQuery();

			while (rs.next()) {
				FolderInfoBean folderInfoBean = new FolderInfoBean();

				folderInfoBean.setId(rs.getString("folder_info.folder_id"));
				folderInfoBean.setName(rs.getString("folder_info.folder_name"));
				folderInfoBean.setOwnerID(rs.getString("folder_info.folder_owner"));
				folderInfoBean.setOwnerName(rs.getString("user_info.user_name"));
				folderInfoBean.setDate(rs.getDate("folder_info.folder_date").toString());
				folderInfoBean.setDelete(rs.getBoolean("folder_info.folder_delete"));
				folderInfoBean.setParentID(rs.getString("folder_info.folder_parent_id"));
				folderInfoBean.setSharedRootID(rs.getString("folder_info.folder_shared_root_id"));

				folders.add(folderInfoBean);

			}

			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getDBFolderList fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return folders;

	}

	public FolderInfoBean getDBByNameAndParentID(String parentID, String name) {
		db.connect();

		String sql = "SELECT * FROM folder_info INNER JOIN user_info ON folder_info.folder_owner=user_info.user_id WHERE folder_parent_id=? AND folder_name =?;";
		FolderInfoBean folderInfoBean = new FolderInfoBean();
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, parentID);
			pstmt.setString(2, name);
			ResultSet rs = pstmt.executeQuery();

			rs.next();

			folderInfoBean.setId(rs.getString("folder_id"));
			folderInfoBean.setName(rs.getString("folder_name"));
			folderInfoBean.setOwnerID(rs.getString("folder_owner"));
			folderInfoBean.setOwnerName(rs.getString("user_name"));
			folderInfoBean.setDate(rs.getDate("folder_date").toString());
			folderInfoBean.setDelete(rs.getBoolean("folder_delete"));
			folderInfoBean.setParentID(rs.getString("folder_parent_id"));
			folderInfoBean.setSharedRootID(rs.getString("folder_shared_root_id"));

			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("folderDAO getDBByNameAndParentID fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return folderInfoBean;
	}

	public ArrayList<FolderInfoBean> getDBFolderChildrenList(String parentID) {
		db.connect();
		ArrayList<FolderInfoBean> folders = new ArrayList<FolderInfoBean>();

		String sql = "SELECT * FROM folder_info INNER JOIN user_info ON folder_info.folder_owner=user_info.user_id WHERE folder_parent_id=?;";

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, parentID);
			ResultSet rs = pstmt.executeQuery();

			while (rs.next()) {
				FolderInfoBean folderInfoBean = new FolderInfoBean();

				folderInfoBean.setId(rs.getString("folder_info.folder_id"));
				folderInfoBean.setName(rs.getString("folder_info.folder_name"));
				folderInfoBean.setOwnerID(rs.getString("folder_info.folder_owner"));
				folderInfoBean.setOwnerName(rs.getString("user_info.user_name"));
				folderInfoBean.setDate(rs.getDate("folder_info.folder_date").toString());
				folderInfoBean.setDelete(rs.getBoolean("folder_info.folder_delete"));
				folderInfoBean.setParentID(rs.getString("folder_info.folder_parent_id"));
				folderInfoBean.setSharedRootID(rs.getString("folder_info.folder_shared_root_id"));

				folders.add(folderInfoBean);

			}

			rs.close();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getDBFolderChildrenList fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return folders;
	}

	public boolean insertDB(FolderInfoBean folderInfoBean) {
		db.connect();

		String sql = "INSERT INTO `folder_info` (`folder_id`, `folder_name`, `folder_owner`, `folder_date`, `folder_parent_id`, `folder_shared_root_id`) VALUES (UUID(), ?,?,?,?,?);";

		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, folderInfoBean.getName());
			pstmt.setString(2, folderInfoBean.getOwnerID());
			pstmt.setString(3, folderInfoBean.getDate());
			pstmt.setString(4, folderInfoBean.getParentID());
			pstmt.setString(5, folderInfoBean.getSharedRootID());

			pstmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("insertDB folderDAO fail!");
			return false;
		} finally {
			db.disconnect();
		}
		return true;
	}

	public void renameFolder(FolderInfoBean folderInfoBean) {
		db.connect();

		String sql = "UPDATE folder_info SET folder_name=? where folder_id=?;";
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, folderInfoBean.getName());
			pstmt.setString(2, folderInfoBean.getId());
			pstmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			db.disconnect();
		}

	}

	public boolean updateDBDelete(FolderInfoBean folderInfoBean) {
		db.connect();
		String sql = "UPDATE folder_info SET folder_delete=?, folder_date=? WHERE folder_id=?";

		try {
			pstmt = db.getConnection().prepareStatement(sql);

			pstmt.setBoolean(1, folderInfoBean.isDelete());
			pstmt.setString(2, folderInfoBean.getDate());
			pstmt.setString(3, folderInfoBean.getId());

			pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} finally {
			db.disconnect();
		}
		return true;
	}

	public boolean updateDBPath(FolderInfoBean folderInfoBean) {
		db.connect();
		String sql = "UPDATE folder_info SET folder_name=?, folder_date=?, folder_parent_id=?, folder_owner=?, folder_shared_root_id=? WHERE folder_id=?";

		try {
			pstmt = db.getConnection().prepareStatement(sql);

			pstmt.setString(1, folderInfoBean.getName());
			pstmt.setString(2, folderInfoBean.getDate());
			pstmt.setString(3, folderInfoBean.getParentID());
			pstmt.setString(4, folderInfoBean.getOwnerID());
			pstmt.setString(5, folderInfoBean.getSharedRootID());
			pstmt.setString(6, folderInfoBean.getId());

			pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} finally {
			db.disconnect();
		}
		return true;
	}

	public boolean checkOverlappingName(FolderInfoBean folderInfoBean) {
		boolean uniqueName = false;

		db.connect();
		String sql = "SELECT folder_name FROM folder_info WHERE folder_parent_id=? AND folder_name=? AND folder_delete = ?;";
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, folderInfoBean.getParentID());
			pstmt.setString(2, folderInfoBean.getName());
			pstmt.setBoolean(3, false);
			ResultSet rs = pstmt.executeQuery();
			ArrayList<String> list = new ArrayList<String>();
			while (rs.next()) {
				list.add(rs.getString("folder_name"));
			}
			if (list.size() != 0) {
				uniqueName = false;
			} else {
				uniqueName = true;
			}

		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("checkOverlappingName folderDAO fail!");
		} finally {
			db.disconnect();
		}
		return uniqueName;
	}

	public boolean updateSharedRootID(String rootID, String id) {
		db.connect();

		String sql = "UPDATE folder_info SET folder_shared_root_id=? WHERE folder_id=?";
		
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, rootID);
			pstmt.setString(2, id);
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

		String sql = "DELETE FROM folder_info WHERE folder_id=?";

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
	
	// 검색한 폴더 찾기
	public ArrayList<FolderInfoBean> searchFolder(String userID, String clue){
		ArrayList<FolderInfoBean> folders = new ArrayList<FolderInfoBean>();
		
		db.connect();
		
		String sql="SELECT * FROM folder_info INNER JOIN user_info ON folder_info.folder_owner=user_info.user_id WHERE (folder_info.folder_owner=?) AND (folder_info.folder_name LIKE ?) AND (folder_info.folder_delete=0);";
		
		try{
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, userID);
			pstmt.setString(2, "%"+clue+"%");
			ResultSet rs = pstmt.executeQuery();
			
			while(rs.next()){
				FolderInfoBean folderInfoBean = new FolderInfoBean();
				folderInfoBean.setId(rs.getString("folder_info.folder_id"));
				folderInfoBean.setName(rs.getString("folder_info.folder_name"));
				folderInfoBean.setOwnerID(rs.getString("folder_info.folder_owner"));
				folderInfoBean.setOwnerName(rs.getString("user_info.user_name"));
				folderInfoBean.setDate(rs.getString("folder_info.folder_date"));
				folderInfoBean.setParentID(rs.getString("folder_info.folder_parent_id"));
				folderInfoBean.setSharedRootID(rs.getString("folder_info.folder_shared_root_id"));
				folderInfoBean.setDelete(rs.getBoolean("folder_info.folder_delete"));
								
				folders.add(folderInfoBean);
			}
			
		}catch(SQLException e){
			e.printStackTrace();
			System.out.println("error of the search folders");
		}finally{
			db.disconnect();
		}
		return folders;
	}

}

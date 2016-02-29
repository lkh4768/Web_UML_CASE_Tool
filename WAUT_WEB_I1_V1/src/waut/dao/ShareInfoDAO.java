package waut.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import waut.bean.FileInfoBean;
import waut.bean.FolderInfoBean;
import waut.bean.ShareInfoBean;

public class ShareInfoDAO {
	private DBConnection db;
	private PreparedStatement pstmt = null;

	public ShareInfoDAO() {
		db = DBConnection.getDBInstance();
	}
	
	public ArrayList<ShareInfoBean> getDBMemberList(String sharedRootId){
		db.connect();
		
		ArrayList<ShareInfoBean> members = new ArrayList<ShareInfoBean>();

		String sql = "SELECT * FROM share_info INNER JOIN user_info ON share_info.share_member_id=user_info.user_id WHERE share_shared_root_id=?;";
		
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, sharedRootId);
			ResultSet rs = pstmt.executeQuery();

			
			while (rs.next()) {

				ShareInfoBean shareInfoBean = new ShareInfoBean();

				shareInfoBean.setShare_id(rs.getString("share_info.share_id"));
				shareInfoBean.setShare_shared_root_id(rs.getString("share_info.share_shared_root_id"));
				shareInfoBean.setShare_member_id(rs.getString("share_info.share_member_id"));
				shareInfoBean.setShare_member_name(rs.getString("user_info.user_name"));
				
				
				members.add(shareInfoBean);

			}
			rs.close();
		
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("getDBFolderList fail!!!");
			return null;
		} finally {
			db.disconnect();
		}
		return members;
	}

	public ShareInfoBean insertDB(ShareInfoBean shareInfoBean){
		db.connect();
		
		
		String sql = "INSERT INTO `share_info` (`share_id`, `share_shared_root_id`, `share_member_id`) VALUES (UUID(), ?,?);";
		String sql2 = "SELECT * FROM user_info WHERE user_id=?;";

		String userName ="";
		try {
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, shareInfoBean.getShare_shared_root_id());
			pstmt.setString(2, shareInfoBean.getShare_member_id().trim());
			pstmt.executeUpdate();
			

		} catch (SQLException e) {
			e.printStackTrace();
		}try{
			pstmt = db.getConnection().prepareStatement(sql2);
			pstmt.setString(1, shareInfoBean.getShare_member_id());
			ResultSet rs = pstmt.executeQuery();
			while(rs.next()){
				shareInfoBean.setShare_member_name(rs.getString("user_name"));
			}
		} catch(SQLException e){
			e.printStackTrace();
		}finally{
			db.disconnect();
		}
		
		return shareInfoBean;
		
	}
	
	public void deleteDB(ShareInfoBean shareInfoBean){
		
		db.connect();
		
		String sql = "DELETE FROM share_info WHERE share_member_id=? AND share_shared_root_id=?;";
		try{
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, shareInfoBean.getShare_member_id().trim());
			pstmt.setString(2, shareInfoBean.getShare_shared_root_id());

			pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			db.disconnect();
		}
		
	}
	public boolean checkOverlappingID(ShareInfoBean shareInfoBean){
		boolean uniqueID = false;
		
		db.connect();
		String sql = "SELECT * FROM share_info WHERE share_shared_root_id=? AND share_member_id=?;";
		try{
			pstmt = db.getConnection().prepareStatement(sql);

			pstmt.setString(1, shareInfoBean.getShare_shared_root_id());
			pstmt.setString(2, shareInfoBean.getShare_member_id());
			
			ResultSet rs = pstmt.executeQuery();
			ArrayList<String> list = new ArrayList<String>();
			while(rs.next()){
				list.add(rs.getString("share_member_id"));
			}
			if(list.size() != 0){
				uniqueID = false;
			}else{
				uniqueID = true;				
			}

		}catch(SQLException e){
			e.printStackTrace();
		}finally{
			db.disconnect();
		}
		
		return uniqueID;
	}
	public boolean confirmID(ShareInfoBean shareInfoBean){
		boolean confirmed = false;
		
		db.connect();
		
		String sql = "SELECT user_id FROM user_info WHERE user_id=?;";
		try{
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, shareInfoBean.getShare_member_id());
			
			ResultSet rs = pstmt.executeQuery();
			ArrayList<String> list = new ArrayList<String>();	
			while(rs.next()){
				list.add(rs.getString("user_id"));
			}
			if(list.size() == 0){
				confirmed = false;
			}else{
				confirmed = true;				
			}

		}catch(SQLException e){
			e.printStackTrace();
		}finally{
			db.disconnect();
		}
		
		
		return confirmed;
	}
	public ArrayList<String> getSharedRootID(String userID){
		db.connect();
		ArrayList<String> list = new ArrayList<String>();	
	
			String sql = "SELECT * FROM share_info WHERE share_member_id=?;";
		
		try{
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, userID);
			
			ResultSet rs = pstmt.executeQuery();
			while(rs.next()){
				list.add(rs.getString("share_shared_root_id"));
			}

		}catch(SQLException e){
			e.printStackTrace();
			System.out.println("error of getSharedRootID in ShareInfoDAO");
		}finally{
			db.disconnect();
		}
		
		return list;

	}
	
	public ArrayList<FolderInfoBean> getSharedFolderByRoot(String rootID, String clue){
		db.connect();

		ArrayList<FolderInfoBean> folders = new ArrayList<FolderInfoBean>();
			
		String sql = "SELECT * FROM folder_info INNER JOIN user_info ON folder_info.folder_owner = user_info.user_id WHERE folder_info.folder_shared_root_id=? AND (folder_info.folder_name LIKE ?) AND folder_info.folder_delete=0;";
		
		try{
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, rootID);
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
			System.out.println("error of getSharedFolderByRoot in ShareInfoDAO");
		}finally{
			db.disconnect();
		}
		
		return folders;

	}
	public ArrayList<FileInfoBean> getSharedFileByRoot(String rootID, String clue){
		db.connect();

		ArrayList<FileInfoBean> files = new ArrayList<FileInfoBean>();
			
		String sql = "SELECT * FROM file_info INNER JOIN user_info ON file_info.file_owner = user_info.user_id WHERE file_info.file_shared_root_id=? AND (file_info.file_name LIKE ?) AND file_info.file_delete=0;";
		
		try{
			pstmt = db.getConnection().prepareStatement(sql);
			pstmt.setString(1, rootID);
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
			System.out.println("error of getSharedFileByRoot in ShareInfoDAO");
		}finally{
			db.disconnect();
		}
		
		return files;

	}
	

	
}

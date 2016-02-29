package waut.bean;

public class ShareInfoBean {
	
	private String share_id;
	private String share_shared_root_id;
	private String share_member_id;
	private String share_member_name;
	
	public ShareInfoBean(){
		
	}
	public ShareInfoBean(String sharedID, String shareShredRootId, String shareMemberId, String shareMemberName){
		this.share_id = sharedID;
		this.share_member_id = shareMemberId;
		this.share_shared_root_id = shareShredRootId;
		this.share_member_name = shareMemberName;
	}
	
	
	public String getShare_id() {
		return share_id;
	}
	public void setShare_id(String share_id) {
		this.share_id = share_id;
	}
	public String getShare_shared_root_id() {
		return share_shared_root_id;
	}
	public void setShare_shared_root_id(String shareShredRootId) {
		this.share_shared_root_id = shareShredRootId;
	}
	public String getShare_member_id() {
		return share_member_id;
	}
	public void setShare_member_id(String share_member_id) {
		this.share_member_id = share_member_id;
	}
	public String getShare_member_name(){
		return this.share_member_name;
	}
	public void setShare_member_name(String shareMemberName){
		this.share_member_name = shareMemberName;
	}
}

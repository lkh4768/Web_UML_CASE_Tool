package waut.bean;

import java.util.Date;

public class FolderInfoBean {
	private String id;
	private String name;
	private String ownerID;
	private String ownerName;
	private String date;
	private boolean isDelete;
	private String parentID;
	private String sharedRootID;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOwnerID() {
		return ownerID;
	}

	public void setOwnerID(String ownerID) {
		this.ownerID = ownerID;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public boolean isDelete() {
		return isDelete;
	}

	public void setDelete(boolean isDelete) {
		this.isDelete = isDelete;
	}

	public String getParentID() {
		return parentID;
	}

	public void setParentID(String parentID) {
		this.parentID = parentID;
	}

	public String getSharedRootID() {
		return sharedRootID;
	}

	public void setSharedRootID(String sharedRootID) {
		this.sharedRootID = sharedRootID;
	}

}

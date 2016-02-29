package waut.bean;

public class FileInfoBean {
	private String id;
	private String name;
	private String ownerID;
	private String ownerName;
	private String modifierID;
	private String modifierName;
	private String date;
	private boolean isDelete;
	private String parentID;
	private String sharedRootID;
	private boolean isLock;

	public FileInfoBean() {
	}

	public FileInfoBean(String id, String name, String ownerID, String ownerName, String modifierID,
			String modifierName, String date, boolean isDelete, String parentID, String sharedRootID, boolean isLock) {
		this.id = id;
		this.name = name;
		this.ownerID = ownerID;
		this.ownerName = ownerName;
		this.modifierID = modifierID;
		this.modifierName = modifierName;
		this.date = date;
		this.isDelete = isDelete;
		this.parentID = parentID;
		this.sharedRootID = sharedRootID;
		this.isLock = isLock;
	}

	public FileInfoBean(String name, String ownerID, String modifierID, String date, String parentID,
			String sharedRootID) {
		this.name = name;
		this.ownerID = ownerID;
		this.modifierID = modifierID;
		this.date = date;
		this.parentID = parentID;
		this.sharedRootID = sharedRootID;
	}

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

	public String getModifierID() {
		return modifierID;
	}

	public void setModifierID(String modifierID) {
		this.modifierID = modifierID;
	}

	public String getModifierName() {
		return modifierName;
	}

	public void setModifierName(String modifierName) {
		this.modifierName = modifierName;
	}

	public String getSharedRootID() {
		return sharedRootID;
	}

	public void setSharedRootID(String sharedRootID) {
		this.sharedRootID = sharedRootID;
	}

	public boolean isLock() {
		return isLock;
	}

	public void setLock(boolean isLock) {
		this.isLock = isLock;
	}

}

package waut.bean;

public class CommentInfoBean {

	private String id;
	private String fileID;
	private String date;
	private String ownerID;
	private String ownerName;
	private String comment;

	public CommentInfoBean() {
	}

	public CommentInfoBean(String fileID, String date, String ownerID, String comment) {
		this.fileID = fileID;
		this.date = date;
		this.ownerID = ownerID;
		this.comment = comment;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFileID() {
		return fileID;
	}

	public void setFileID(String fileID) {
		this.fileID = fileID;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
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

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

}

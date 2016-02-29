package waut.bean;

public class LogInfoBean {

	private String id;
	private String fileID;
	private String ownerID;
	private String ownerName;
	private String date;
	private int content;

	public static final int READ = 0;
	public static final int CREATE = 1;
	public static final int UPDATE = 2;

	public LogInfoBean() {

	}

	public LogInfoBean(String fileID, String ownerID, String ownerName, String date, int content) {
		this.fileID = fileID;
		this.ownerID = ownerID;
		this.ownerName = ownerName;
		this.date = date;
		this.content = content;
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

	public int getContent() {
		return content;
	}

	public void setContent(int content) {
		this.content = content;
	}

}

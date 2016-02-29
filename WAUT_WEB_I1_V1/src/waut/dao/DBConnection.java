package waut.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
	private static DBConnection connectInstance = null;
	private Connection conn = null;

	/* MySQL 연결정보 */
	private String jdbc_driver = "com.mysql.jdbc.Driver";
	private String jdbc_url = "jdbc:mysql://capstone.myaxler.org:3306/Drawml_DB?useUnicode=yes&characterEncoding=UTF-8";

	private DBConnection(){
		
	}
	// DB연결 메서드
	public void connect() {
		try {
			Class.forName(jdbc_driver);

			conn = DriverManager.getConnection(jdbc_url, "root", "rktehf1!");
		} catch (Exception e) {
			System.out.println("not working jdbc");
			e.printStackTrace();
		}
	}

	public static DBConnection getDBInstance(){
		if(connectInstance == null){
			connectInstance = new DBConnection();
		}
		
		return connectInstance;
	}
	
	public void disconnect() {
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	public Connection getConnection(){
		return conn;
	}
}

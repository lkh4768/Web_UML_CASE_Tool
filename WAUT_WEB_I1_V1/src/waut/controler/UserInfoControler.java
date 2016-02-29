package waut.controler;

import java.util.Random;

import waut.bean.UserInfoBean;
import waut.dao.UserInfoDAO;

public class UserInfoControler {
	private UserInfoDAO userinfoDAO = new UserInfoDAO();

	public UserInfoBean login(String id, String pw) {
		return userinfoDAO.getDBByIdAndPw(id, pw);
	}

	public boolean checkID(String id) {
		return userinfoDAO.selectDBByID(id);
	}

	public boolean checkEmergencyEmail(String email) {
		
		if (userinfoDAO.getDBByEmergencyEmail(email) != null)
			return true;
		else
			return false;
		
	}

	public boolean join(String id, String pw, String emergencyEmail, String name) {
		UserInfoBean userInfoBean = new UserInfoBean(id, pw, emergencyEmail, name);

		return userinfoDAO.insertDB(userInfoBean);
	}

	public boolean leave(String id) {
		return userinfoDAO.deleteDB(id);
	}

	public boolean modify(String id, String pw, String emergencyEmail, String name) {
		UserInfoBean userInfoBean = new UserInfoBean(id, pw, emergencyEmail, name);

		return userinfoDAO.updateDB(userInfoBean);
	}

	public UserInfoBean getUserInfoByEmergencyEmail(String email) {
		return userinfoDAO.getDBByEmergencyEmail(email);
	}

	public String updatePwByEmergencyEmail(String email) {
		String tmpStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,1,2,3,4,5,6,7,8,9,0";
		String chars[] = tmpStr.split(",");
		String tmpPw = "";
		Random random = new Random();

		for (int i = 0; i < 10; i++) {
			tmpPw = tmpPw + chars[random.nextInt(chars.length)];
		}

		if (userinfoDAO.updateDBPw(email, tmpPw)) {
			return tmpPw;
		} else {
			return null;
		}
	}
}

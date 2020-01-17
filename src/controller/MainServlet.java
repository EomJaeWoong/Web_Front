package controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.*;

public class MainServlet extends HttpServlet {
	protected void doProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("application/json);charset=utf-8");
		
		BufferedReader br = request.getReader();
		JSONObject obj = (JSONObject)JSONValue.parse(br);
		PrintWriter out = response.getWriter();
		
		String marker = (String)obj.get("marker");
		
		if(marker != null){
			if(marker.equals("login")){
				String email = (String)obj.get("email");	
				obj = new JSONObject();
				
				if(true) {
					obj.put("resultCode", 1);
					obj.put("message", email + "님 환영합니다");
				}
				else {
					obj.put("resultCode", 0);
					obj.put("message", "이메일이나 비밀번호가 맞지 않습니다.");
				}
			}
			
			else if(marker.equals("logout")){
				//할당된 세션 종료
				obj = new JSONObject();
				obj.put("message", "로그아웃 되셨습니다.");
			}
		}
		
		else{
			obj = new JSONObject();
			obj.put("message", "해커왔다");
		}
		
		out.print(obj);
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doProcess(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doProcess(request, response);
	}
}

package com.example.demo.model;

import java.awt.Image;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor	
@ToString
@Document(collection = "SessionData")
public class Sessiondata {
	@Id
	private int sessionId;
	private Integer userId;
	private Image data;
	
	public Sessiondata() {
		super();
	}
	/*
	  { "Sessiondata": { "sessionId":20, "data": "plot the data"} }
	 */

	public Sessiondata(int sessionId, Integer userId, Image data) {
		super();
		this.sessionId = sessionId;
		this.userId = userId;
		this.data = data;
	}

	public int getSessionId() {
		return sessionId;
	}

	public void setSessionId(int sessionId) {
		this.sessionId = sessionId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Image getData() {
		return data;
	}

	public void setData(Image data) {
		this.data = data;
	}
	
	
	
	
	
}

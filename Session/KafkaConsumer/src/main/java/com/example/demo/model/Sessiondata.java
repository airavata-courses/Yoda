package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

	
@ToString
@Document(collection = "SessionData")
public class Sessiondata {
	@Id
	private int sessionId;
	private String data;
	
	
	public Sessiondata(int sessionId, String data) {
		super();
		this.sessionId = sessionId;
		this.data = data;
	}
	public int getSessionId() {
		return sessionId;
	}
	public void setSessionId(int sessionId) {
		this.sessionId = sessionId;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}

	
	
}

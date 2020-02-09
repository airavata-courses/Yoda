package com.example.demo.model;

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
	private String data;
	
	public Sessiondata() {
		super();
	}
	/*
	  { "Sessiondata": { "sessionId":20, "data": "plot the data"} }
	 */
	
	
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

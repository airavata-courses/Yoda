package com.example.demo.model;

import java.awt.Image;
import java.util.Date;

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

public class UpdateStatus {
	@Id
	private int sessionId;
	private int userId;
	
	public UpdateStatus(int sessionId, int userId) {
		super();
		this.sessionId = sessionId;
		this.userId = userId;
	}
	public UpdateStatus() {
		super();
	}
	public int getSessionId() {
		return sessionId;
	}
	public void setSessionId(int sessionId) {
		this.sessionId = sessionId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	
	
	
}

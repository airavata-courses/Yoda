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
@Document(collection = "ActivityLists")
public class Sessiondata {
	@Id
	private int sessionId;
	private Integer userId;
	private String status;
	private String createdDate;
	
	public Sessiondata() {
		super();
	}

	public Sessiondata(int sessionId, Integer userId, String status, String createdDate) {
		super();
		this.sessionId = sessionId;
		this.userId = userId;
		this.status = status;
		this.createdDate = createdDate;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	

	
	
}

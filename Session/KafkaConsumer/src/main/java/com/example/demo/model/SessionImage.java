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
@Document(collection = "ActivityDetail")
public class SessionImage {
	@Id
	private int sessionId;
	private String radar;
	private int day;
	private int month;
	private int year;
	private String image;
	private Date createdDate;
	
	public SessionImage() {
		super();
	}

	public SessionImage(int sessionId, String radar, int day, int month, int year, String image, Date createdDate) {
		super();
		this.sessionId = sessionId;
		this.radar = radar;
		this.day = day;
		this.month = month;
		this.year = year;
		this.image = image;
		this.createdDate = createdDate;
	}

	public int getSessionId() {
		return sessionId;
	}

	public void setSessionId(int sessionId) {
		this.sessionId = sessionId;
	}

	public String getRadar() {
		return radar;
	}

	public void setRadar(String radar) {
		this.radar = radar;
	}

	public int getDay() {
		return day;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	
	
	
	


	
	
	
	
}

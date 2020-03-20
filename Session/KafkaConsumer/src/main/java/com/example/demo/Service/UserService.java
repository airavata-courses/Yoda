package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.Repository.ActivityDetailsRepository;
import com.example.demo.Repository.SessionRepository;
import com.example.demo.model.SessionImage;
import com.example.demo.model.Sessiondata;

@Service
public class UserService {

	@Autowired
	private SessionRepository repository;
	

	public Sessiondata saveSession(@RequestBody Sessiondata data) {
		 repository.save(data);
		 return data;
	}

	public List<Sessiondata> getUsers() {
		List<Sessiondata> users = repository.findAll();
		System.out.println("Getting data from DB : " + users);
		return users;
	}

	public List<Sessiondata> getUserbySessionID(String userID) {
		
		List<Sessiondata> list=new ArrayList<Sessiondata>();
		List<Sessiondata> updatedlist=new ArrayList<Sessiondata>();
		list=repository.findAll();
		
		for(Sessiondata data: list) {
			if(data.getUserId().equals(userID)) {
				updatedlist.add(data);
			}
		}
		return repository.findAll(); 
	}
	
	@Autowired
	private ActivityDetailsRepository detailedRepo;

public List<SessionImage> getsUserData(String sessionId) {
		
	List<SessionImage> list=detailedRepo.findAll();
	List<SessionImage> updatedlist=new ArrayList<SessionImage>();
	for(SessionImage data: list) {
		if(data.getSessionId().equals(sessionId)) {
			updatedlist.add(data);
		}
	}
	
	return updatedlist;
		 
	}
		
}
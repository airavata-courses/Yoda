package com.example.demo;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.demo.Repository.ActivityDetailsRepository;
import com.example.demo.Repository.SessionRepository;
import com.example.demo.model.SessionImage;
import com.example.demo.model.Sessiondata;
import com.example.demo.service.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class KafkaConsumerApplicationTests{
	
	@Autowired
	UserService us;
	
	@MockBean
	private SessionRepository repository;
	
	@MockBean
	private ActivityDetailsRepository detailedRepo;
	//@Autowired
	//private ActivityDetailsRepository detailedRepo;
	
	// @Test
	// public void getUsersTest() {
	// 	when(repository.findAll()).thenReturn(Stream.of(new Sessiondata("goutham","123","ex","date"),new Sessiondata("tanvi","123","ex","date")).collect(Collectors.toList()));
	// 	assertEquals(2, us.getUsers().size());
		
	// }
	
	@Test
	public void saveSessionTest() {
		Sessiondata data= new Sessiondata("omkar","123","ex","date");
		when(repository.save(data)).thenReturn(data);
		assertEquals(data, us.saveSession(data));
	}
	
	@Test
	public void getUserbySessionIDTest() {
		Sessiondata data=new Sessiondata("userTest", "456", "comp", "date");
		List<Sessiondata> list=new ArrayList<Sessiondata>();
		list.add(data);
		when(repository.findAll()).thenReturn(list);
		
		assertEquals(list, us.getUserbySessionID("userTest"));
	}
	
	@Test
	public void getUserDataTest() {
		SessionImage data=new SessionImage("userTest", "XYZ", 21, 02, 2020, "image", "06-21-2020");
		List<SessionImage> list=new ArrayList<SessionImage>();
		list.add(data);
		when(detailedRepo.findAll()).thenReturn(list);
		
		assertEquals(list, us.getsUserData("userTest"));
	}
	
}

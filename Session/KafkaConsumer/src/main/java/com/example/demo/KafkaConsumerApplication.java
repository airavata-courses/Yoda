package com.example.demo;

import java.awt.Image;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentMap;

import net.razorvine.pickle.PickleException;
import net.razorvine.pickle.Unpickler;
import org.python.core.PyDictionary;
import org.python.core.PyFile;
import org.python.core.PyObject;
import org.python.core.PyString;
import org.python.modules.cPickle;
import org.python.util.PythonInterpreter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repository.SessionRepository;
import com.example.demo.model.Sessiondata;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;


@SpringBootApplication
@ComponentScan({"com.example"})
@RestController
public class KafkaConsumerApplication {

	List<String> messages =new ArrayList<>();
	
	@Autowired
	private SessionRepository repository;
	
	@PostMapping("/addSession")
	public String saveSession(@RequestBody Sessiondata data) {
		repository.save(data);
		return "Added session with data";
		
	}
	
	@GetMapping("/findAllBooks/{userId}")
	public List<Sessiondata> getUserData(@PathVariable Integer userId){
		List<Sessiondata> list=new ArrayList<Sessiondata>();
		List<Sessiondata> updatedlist=new ArrayList<Sessiondata>();
		list=repository.findAll();
		for(Sessiondata data: list) {
			System.out.println(data.getUserId()+"eshfghsrefvhgesvfh"+userId);
			if(data.getUserId().equals(userId)) {
				updatedlist.add(data);
				System.out.println("sdfesd"+updatedlist);
			}
		}
		return updatedlist;
		
	}
	@GetMapping("/findById/{sessionId}")
	public Optional<Sessiondata> getData(@PathVariable int sessionId){
		return repository.findById(sessionId);
	}
	
	@GetMapping("/consumeStringMessage")
	public List<String> consumeMsg(){
		return messages;
	}
	
	
	@KafkaListener(groupId = "javaADS", topics = "SessionKafka1",containerFactory ="kafkaListenerContainerFactory" )
	public List<String> getMsgFromTopic(String data) {
		messages.add(data);
		return messages;
	}
	
	
	
	@KafkaListener(groupId = "kafkagroupid", topics = "data-session",containerFactory ="jsonKafkaListenerContainerFactory" )
	public Sessiondata getJSONMsgFromTopic(byte[] data) throws PickleException, IOException {
		Unpickler u = new Unpickler();
		Integer userId=12345;
		Object[] result = (Object[]) u.loads(data);
		int sessionId=(int)result[0];
		byte[] b=(byte[])result[1];
		Object[] result1 = (Object[]) u.loads(data);
		Image image=(Image)result[0];
		
		System.out.println(sessionId+"ewjdej"+image);
		Sessiondata userData=new Sessiondata(sessionId, userId, image);
		
		/*
		 * PyDictionary phash = (PyDictionary) cPickle.loads(data);
		 * ConcurrentMap<PyObject, PyObject> aMap = phash.getMap(); //Sessiondata
		 * dataFromTopic=data;
		 * System.out.println("**********"+dataFromTopic.getSessionId()+"id-data"+
		 * dataFromTopic.getData()); saveSession(dataFromTopic);
		 */
		return null;
	}
	
	public static void main(String[] args) {
		SpringApplication.run(KafkaConsumerApplication.class, args);
	}

}

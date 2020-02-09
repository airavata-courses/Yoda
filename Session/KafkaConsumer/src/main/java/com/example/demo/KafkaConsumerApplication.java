package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
	@GetMapping("/findAllBooks")
	public List<Sessiondata> getData(){
		return repository.findAll();
		
	}
	@GetMapping("/findById/{id}")
	public Optional<Sessiondata> getData(@PathVariable int id){
		return repository.findById(id);
	}
	
	@GetMapping("/consumeStringMessage")
	public List<String> consumeMsg(){
		return messages;
	}
	
	/*
	 * @GetMapping("/consumeJSONMessage") public Sessiondata consumeJSONMsg() {
	 * return dataFromTopic; }
	 */
	
	@KafkaListener(groupId = "javaADS", topics = "SessionKafka1",containerFactory ="kafkaListenerContainerFactory" )
	public List<String> getMsgFromTopic(String data) {
		messages.add(data);
		return messages;
	}
	
	
	
	@KafkaListener(groupId = "JSONjavaADS", topics = "SessionKafkaJSON",containerFactory ="jsonKafkaListenerContainerFactory" )
	public Sessiondata getJSONMsgFromTopic(Sessiondata data) {
		Sessiondata	dataFromTopic=data;
		System.out.println("**********"+dataFromTopic.getSessionId()+"id-data"+dataFromTopic.getData());
		saveSession(dataFromTopic);
		return dataFromTopic;
	}
	
	public static void main(String[] args) {
		SpringApplication.run(KafkaConsumerApplication.class, args);
	}

}

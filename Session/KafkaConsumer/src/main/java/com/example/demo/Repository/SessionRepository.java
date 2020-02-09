package com.example.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.Sessiondata;

public interface SessionRepository extends MongoRepository<Sessiondata, Integer>{

}

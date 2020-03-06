package com.example.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.SessionImage;



public interface ActivityDetailsRepository extends MongoRepository<SessionImage, Integer>{

}

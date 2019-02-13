package com.sean.poc.planner.db;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;


@Configuration
public class PlannerMongoConfig {

    @Bean
    public MongoDbFactory mongoDbFactory() throws Exception {
        // Set credentials
//        MongoCredential credential = MongoCredential.createCredential("", "task-db", "".toCharArray());
        MongoCredential credential = MongoCredential.createCredential("admin", "admin", "project1".toCharArray());

        ServerAddress serverAddress = new ServerAddress("localhost",27017);
        MongoClientOptions options = MongoClientOptions.builder().socketTimeout(5000).build();

        // Mongo Client
        MongoClient mongoClient = new MongoClient(serverAddress, credential, options);

        // Mongo DB Factory
        SimpleMongoDbFactory factory = new SimpleMongoDbFactory(mongoClient, "task-db");

        return factory;
    }

    /**
     * Template ready to use to operate on the database
     *
     * @return Mongo Template ready to use
     */
    @Bean
    public MongoOperations mongoOperations() throws Exception {
        return new MongoTemplate(mongoDbFactory());
    }
}

package com.sean.poc.planner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sean.poc.planner.db.PlannerMongoConfig;
import com.sean.poc.planner.model.Task;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@Import(PlannerMongoConfig.class)
public class PlannerController {


    @Autowired
    MongoOperations mongoOperations;

    private static final String TASK_COLLECTION = "task_store";
    private static final ObjectMapper mapper = new ObjectMapper();

    @RequestMapping(value = "/task/list", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String getTasks() {
        List<Task> tasks = mongoOperations.findAll(Task.class, TASK_COLLECTION);
        String response = "{}";
        try {
             response = mapper.writeValueAsString(tasks);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return response;

    }

    @RequestMapping(value = "/task/add", method = RequestMethod.PUT, produces = "application/json")
    @ResponseBody
    public String addTask(@RequestBody Task task) {
        mongoOperations.insert(task, TASK_COLLECTION);
        return "{ \"response\": \"Task Added!\" }";
    }

    @RequestMapping(value = "/task/complete", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public String completeTask(@RequestBody Task task) {
        Query query = Query.query(Criteria.where("_id").is(task.get_id()));
        Task task2 = mongoOperations.findOne(query, Task.class, TASK_COLLECTION);
        task2.setCompleted(true);
        mongoOperations.save(task2, TASK_COLLECTION);
        return "{ \"response\": \"Task Completed!\" }";
    }

    @RequestMapping(value = "/task/remove", method = RequestMethod.DELETE, produces = "application/json")
    @ResponseBody
    public String removeTask(@RequestBody Task task) {
        Query query = Query.query(Criteria.where("_id").is(task.get_id()));
        mongoOperations.remove(query, Task.class, TASK_COLLECTION);
        return "{ \"response\": \"Task Removed!\" }";
    }



}

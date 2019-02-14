package com.sean.poc.planner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sean.poc.planner.db.PlannerMongoConfig;
import com.sean.poc.planner.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@Import(PlannerMongoConfig.class)
public class PlannerController {


    @Autowired
    MongoOperations mongoOperations;

    private static final String TASK_COLLECTION = "task_store";
    private static final ObjectMapper mapper = new ObjectMapper();

    /**
     * Get records from the DB
     * @param filter
     * @return String response
     */
    @RequestMapping(value = "/task/list", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String getTasks(@RequestParam("filter") String filter) {
        List<Task> tasks = mongoOperations.findAll(Task.class, TASK_COLLECTION);
        List<Task> sortedTasks = new ArrayList<>();
        Date date = new Date();
        for(Task task : tasks){
            if("overdue".equals(filter)){
                if(date.after(task.getDueDate()) && !task.isCompleted()){
                    sortedTasks.add(task);
                }
            }else if("completed".equals(filter)){
                if(task.isCompleted()){
                    sortedTasks.add(task);
                }
            }else if("due-soon".equals(filter) && !task.isCompleted()){
                if(date.before(task.getDueDate())){
                    //Basic function to calculate day difference based on milliseconds
                    long daysDiff = (date.getTime() - task.getDueDate().getTime()) / 86400000;
                    if(daysDiff <=2){
                        sortedTasks.add(task);
                    }
                }
            }else if("".equals(filter) || filter == null){
                sortedTasks.add(task);
            }
        }

        //Mapping tasks to single String for the UI to interpret
        String response = "{}";
        try {
             response = mapper.writeValueAsString(sortedTasks);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return response;

    }

    /**
     * Simple insert
     * @param task
     * @return response
     */
    @RequestMapping(value = "/task/add", method = RequestMethod.PUT, produces = "application/json")
    @ResponseBody
    public String addTask(@RequestBody Task task) {
        mongoOperations.insert(task, TASK_COLLECTION);
        return "{ \"response\": \"Task Added!\" }";
    }

    /**
     * Find document based on its ID and update the completed value
     * @param task
     * @return
     */
    @RequestMapping(value = "/task/complete", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public String completeTask(@RequestBody Task task) {
        Query query = Query.query(Criteria.where("_id").is(task.get_id()));
        Task task2 = mongoOperations.findOne(query, Task.class, TASK_COLLECTION);
        task2.setCompleted(true);
        mongoOperations.save(task2, TASK_COLLECTION);
        return "{ \"response\": \"Task Completed!\" }";
    }

    /**
     * Find document based on its ID and remove it
     * @param task
     * @return
     */
    @RequestMapping(value = "/task/remove", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public String removeTask(@RequestBody Task task) {
        Query query = Query.query(Criteria.where("_id").is(task.get_id()));
        mongoOperations.remove(query, Task.class, TASK_COLLECTION);
        return "{ \"response\": \"Task Removed!\" }";
    }



}

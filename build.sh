#!/bin/bash

#Start Mongo instance
mongod -dbpath ./data/db &

#Configure DB and collection
mongo localhost:27017/admin --eval 'db.createUser({user: "admin",pwd: "project1",roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]});'
mongo localhost:27017 --eval 'use task-db';
mongo localhost:27017/task-db --eval 'db.createCollection("task-db")'

#Compile Java code and run
cd api
mvn clean install
java -jar target/planner-0.1.0.Beta.jar &

#Start webapp
cd ../webapp
npm install
npm start &


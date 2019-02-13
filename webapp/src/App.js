import React, { Component } from 'react';
import Task from './components/Task.js';
import CreateTaskForm from './components/CreateTaskForm.js';
import axios from 'axios';

import './App.css';

class App extends Component {

  state = {
    tasks: [],
    loading: false,
    active: {
      name: '',
      description: '',
      dueDate: '',
      completed: '',
      _id: {}
    }
  };

  componentDidMount() {
    axios.get('http://localhost:8080/task/list')
      .then(resp => {
        const tasks = resp.data;
        console.log("Tasks",tasks);
        this.setState({tasks:tasks});
      })
  }

  handleClick(taskName, completed, description, dueDate, _id) {
    console.log("taskName", taskName);
    this.setState()
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <span>Daily Planner App</span>
        </div>
        <div className="App-body">
          <div className="Create-new" href="">
            <span>Create Task</span>
            <CreateTaskForm/>
          </div>
          <div className="Task-type">
            <div>
              <span>Tasks</span>
            </div>  
            {this.state.tasks.map(
              task => 
                  <Task 
                    _id={task._id} 
                    name={task.taskName} 
                    completed={task.completed} 
                    description={task.description}
                    dueDate = {task.dueDate}
                    onClick={this.handleClick(task.taskName, task.completed, task.description, task.dueDate, task._id)}
                  />)}
          </div>
          <div className="Task-full">
              <span>Detail</span>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;

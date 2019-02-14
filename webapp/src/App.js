import React, { Component } from 'react';
import Task from './components/Task.js';
import Detail from './components/Detail.js';
import CreateTaskForm from './components/CreateTaskForm.js';
import axios from 'axios';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      tasks: [],
      active: {
        name: '',
        description: '',
        dueDate: '',
        completed: '',
        _id: {}
      }
    }
    this.myCallback = this.myCallback.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8080/task/list')
      .then(resp => {
        const tasks = resp.data;
        this.setState({tasks:tasks});
      })
  }

  myCallback = (dataFromChild) => {
    console.log("Data from Child", dataFromChild);
    this.setState({active : dataFromChild});
    console.log("Active", this.state.active);
    this.render();

  }

  render() {

    var x = 0;

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
                    key={x++}
                    _id={task._id} 
                    name={task.taskName} 
                    completed={task.completed} 
                    description={task.description}
                    dueDate = {task.dueDate}
                    callbackFromParent={this.myCallback}
                  />)}
          </div>
          <div className="Task-full">
              <Detail 
                _id = {this.state.active._id}
                name= {this.state.active.name}
                completed = {this.state.active.completed}
                description={this.state.active.description}
                dueDate = {this.state.active.dueDate}
              />
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;

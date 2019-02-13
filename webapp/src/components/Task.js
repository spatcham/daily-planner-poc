import React from 'react';

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: props.description,
            name: props.name,
            dueDate: props.dueDate,
            completed: props.completed
        };
    }

    calculateDueDaysRemaining(){
        var currentDay = new Date();
        currentDay.setHours(0);
        currentDay.setMinutes(0);
        currentDay.setSeconds(0);

        var taskDueDate = new Date(this.state.dueDate);

        console.log(currentDay);
        console.log(taskDueDate);

        return (taskDueDate - currentDay) / (1000 * 60 * 60 * 24);

    }
    
    render() {

        var daysRemaining = this.calculateDueDaysRemaining();
        console.log("daysRemaining", daysRemaining);
        let taskTemplate;

        if(daysRemaining >= 2 && !this.state.completed){
            taskTemplate = <div className="Task-listing" onClick={this.props.onClick}><span><b>Name</b></span><br/><span>{this.state.name}</span></div>;
        }else if(daysRemaining >= 0 && !this.state.completed){
            taskTemplate = <div className="Task-listing" onClick={this.props.onClick} style={{backgroundColor:'yellow'}}><span><b>Name</b></span><br/><span>{this.state.name}</span></div>;
        }else if(this.state.completed){
            taskTemplate = <div className="Task-listing" onClick={this.props.onClick} style={{backgroundColor:'green'}}><span><b>Name</b></span><br/><span>{this.state.name}</span></div>;
        }else{
            taskTemplate = <div className="Task-listing" onClick={this.props.onClick} style={{backgroundColor:'#ff4141'}}><span><b>Name</b></span><br/><span>{this.state.name}</span></div>;
        }

        return (
            <div>
                {taskTemplate}
            </div>
        );
    }
}

export default Task;
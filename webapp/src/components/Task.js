import React from 'react';

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: props._id,
            description: props.description,
            name: props.name,
            dueDate: props.dueDate,
            completed: props.completed
        };
    }

    //TODO: the task due date comes in at an earlier time zone than when it was received by the API microservice
    calculateDueDaysRemaining(){
        var currentDay = new Date();
        currentDay.setHours(0);
        currentDay.setMinutes(0);
        currentDay.setSeconds(0);

        var taskDueDate = new Date(this.state.dueDate);

        return (taskDueDate - currentDay) / (1000 * 60 * 60 * 24);

    }

    //Sends task data back to App.js to be set in state.active
    handleClick = () => {
        var task = this.state;
        this.props.callbackFromParent(task);
    }
    
    render() {

        var daysRemaining = this.calculateDueDaysRemaining();
        let taskTemplate;

        //Set styling on each task block depending on the days remaining
        if(daysRemaining >= 2 && !this.state.completed){
            taskTemplate = 
                <div className="Task-listing" >
                    <span><b>Name</b></span>
                    <br/>
                    <span>{this.state.name}</span>
                </div>;
        }else if(daysRemaining >= 0 && !this.state.completed){
            taskTemplate = 
                <div className="Task-listing" style={{backgroundColor:'yellow'}}>
                    <span><b>Name</b></span>
                    <br/>
                    <span>{this.state.name}</span>
                </div>;
        }else if(this.state.completed){
            taskTemplate = 
                <div className="Task-listing" style={{backgroundColor:'green'}}>
                    <span><b>Name</b></span>
                    <br/>
                    <span>{this.state.name}</span>
                </div>;
        }else{
            taskTemplate = 
                <div className="Task-listing" style={{backgroundColor:'#ff4141'}}>
                    <span><b>Name</b></span>
                    <br/>
                    <span>{this.state.name}</span>
                </div>;
        }

        return (
            <div onClick={this.handleClick}>
                {taskTemplate}
            </div>
        );
    }
}

export default Task;
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

    calculateDueDaysRemaining(){
        var currentDay = new Date();
        currentDay.setHours(0);
        currentDay.setMinutes(0);
        currentDay.setSeconds(0);

        var taskDueDate = new Date(this.state.dueDate);

        return (taskDueDate - currentDay) / (1000 * 60 * 60 * 24);

    }

    handleClick = () => {
        var task = this.state;
        this.props.callbackFromParent(task);
    }
    
    render() {

        var daysRemaining = this.calculateDueDaysRemaining();
        let taskTemplate;

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
import React from 'react';
import axios from 'axios';

class Detail extends React.Component {

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

    deleteTask(reqObj) {
        //Not using HTTP delete here just to get Axios working more easily with Spring 
        axios.post("http://localhost:8080/task/remove", reqObj)
        .then(res => {

        });
    }

    completeTask(reqObj) {
        axios.post("http://localhost:8080/task/complete", reqObj)
        .then(res => {

        });
    }
    
    render() {

        var completedMessage = "";
        if(this.props.completed){
            completedMessage = "Yes";
        }else if(!this.props.completed && this.props.completed !== ""){
            completedMessage = "No";
        }

        var date;
        var dateMessage;
        if(this.props.dueDate !== ''){
            date = new Date(this.props.dueDate);
            dateMessage = date.toDateString();
        }else{
            dateMessage = "";
        }

        return (
            <div className="Detail-body">
                <p>Detail</p>
                <span>Task Name:</span>
                <span>{this.props.name}</span>
                <br />
                <span>Description:</span>
                <span>{this.props.description}</span>
                <br />
                <span>Due Date:</span>
                <span>{dateMessage}</span>
                <br />
                <span>Completed:</span>
                <span>{completedMessage}</span>
                <br />
                <button onClick={() => this.deleteTask(this.props)}>Delete</button>
                <br />
                <button onClick={() => this.completeTask(this.props)}>Complete</button>
            </div>
        );
    }
}

export default Detail;
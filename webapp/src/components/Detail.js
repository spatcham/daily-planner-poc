import React from 'react';

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
    
    render() {

         var date = new Date(this.props.dueDate);

        var message = "";
        if(this.props.completed){
            message = "Yes";
        }else if(!this.props.completed){
            message = "No";
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
                <span>{date.getMonth()}/{date.getDay()}/{date.getFullYear()}</span>
                <br />
                <span>Completed:</span>
                <span>{message}</span>
                <br />
                <button>Delete</button>
                <br />
                <button>Complete</button>
            </div>
        );
    }
}

export default Detail;
import React from 'react';
import axios from 'axios';

class CreateTaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            dueDate: '',
            submitMessage: ''
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});
      }
    
      handleSubmit(event) {
        if(this.state.name.trim()==='' || this.state.description.trim()==='' || this.state.dueDate.trim()===''){
          alert('Please populate all items of the form');
        }else{
          var reqObj = {
            taskName: this.state.name,
            description: this.state.description,
            dueDate: this.state.dueDate
          }
          axios.put("http://localhost:8080/task/add", reqObj)
            .then(res => {
              this.setState({submitMessage : "Success"});
            })
            .catch(error => this.setState({submitMessage:"Failure"}));
          alert('A name was submitted: ' + this.state.name);
        }
        event.preventDefault();
        //Refresh page to get the new task list
        window.location.reload();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Task Name:  
              <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Description:  
              <textarea name="description" value={this.state.description} onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Due Date:
              <input name="dueDate" type="date" value={this.state.dueDate} onChange={this.handleInputChange} />
            </label>
            <br />
            <input type="submit" value="Submit" />
            <span>{this.state.submitMessage}</span>
          </form>
        );
      }

}

export default CreateTaskForm
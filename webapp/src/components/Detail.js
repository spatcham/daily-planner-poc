import React from 'react';

class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: props.description,
            name: props.name,
            dueDate: props.dueDate

        };
    }
    
    render() {

        return (
            
        );
    }
}

export default Detail;
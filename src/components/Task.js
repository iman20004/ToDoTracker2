import React, { Component } from 'react'

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        }
    }

    edit = () => {
        this.setState({
            editing: true
        })
    }

    stopEdit = (event) => {
        this.setState({
            editing: false
        })
        this.handleTaskChange(event)
    }

    handleTaskChange = (event) => {
        let source = event.target
        let newDescription = source.value
        let oldDescription = this.props.description 
        let idNum = this.props.id

        if (oldDescription !== newDescription){
            this.props.taskChangeCallback(idNum, oldDescription, newDescription);
        }
    }

    render() {
        if (this.state.editing) {
            return(
                <input 
                className= {`input-field ${this.props.className}`}
                id={`task-input-${this.props.id}`}
                type = "text"
                defaultValue = {this.props.description}
                style = {{backgroundColor: 'transparent'}}
                onBlur = {this.stopEdit}
                autoFocus
                />
            );
        } else {
            return (
                <div className= {this.props.className} onClick={this.edit}>{this.props.description}</div>
            );
        }
    }

}

export default Task;
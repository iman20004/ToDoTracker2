import React, { Component } from 'react'

class DueDate extends Component {
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
        this.handleDateChange(event)
    }

    handleDateChange = (event) => {
        let source = event.target
        let newDate = source.value
        let oldDate = this.props.dueDate
        let idNum = this.props.id

        if (oldDate !== newDate){
            this.props.dueDateChangeCallback(idNum, oldDate, newDate);
        }
    }

    render() {
        if (this.state.editing) {
            return(
                <input 
                className= {`input-field ${this.props.className}`}
                id={`date-input-${this.props.id}`}
                type = "date"
                defaultValue = {this.props.dueDate}
                style = {{backgroundColor: 'transparent'}}
                onBlur = {this.stopEdit}
                autoFocus
                />
            );
        } else {
            return (
                <div className= {this.props.className} onClick={this.edit}>{this.props.dueDate}</div>
            );
        }
    }

}

export default DueDate;
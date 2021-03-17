import React, { Component } from 'react'

class Status extends Component {
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
        this.handleStatusChange(event)
    }

    handleStatusChange = (event) => {
        let source = event.target
        let newStatus = source.value
        let oldStatus = this.props.status 
        let idNum = this.props.id

        if (oldStatus !== newStatus){
            this.props.statusChangeCallback(idNum, oldStatus, newStatus);
        }
    }

    render() {
        if (this.state.editing) {
            return(
                <select 
                    className= {`input-field ${this.props.className}`}
                    id={`status-input-${this.props.id}`}
                    defaultValue = {this.props.status}
                    style = {{backgroundColor: 'transparent'}}
                    onBlur = {this.stopEdit}
                    autoFocus>
                        <option className= "option" value="complete">complete</option>
                        <option className= "option" value="incomplete">incomplete</option>
                </select>
                
            );
        } else {
            return (
                <div className= {this.props.className1} onClick={this.edit}>{this.props.status}</div>
            );
        }
    }

}

export default Status;
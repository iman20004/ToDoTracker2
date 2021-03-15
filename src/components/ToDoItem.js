// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import Task from './Task'
import DueDate from './DueDate'

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    taskChange = (idNum, oldDescription, newDescription) => {
        let item = this.props.toDoListItem;
        let itemDate = item.due_date;
        let itemStatus = item.status;

        this.props.updateItemCallback(idNum, oldDescription, newDescription, itemDate, itemDate, itemStatus, itemStatus )
    }

    dueDateChange = (idNum, oldDate, newDate) => {
        let item = this.props.toDoListItem;
        let itemTask = item.description;
        let itemStatus = item.status;
    
        this.props.updateItemCallback(idNum, itemTask, itemTask, oldDate, newDate, itemStatus, itemStatus )
    }

    removingItem = () => {
        let item = this.props.toDoListItem;
        this.props.removeItemCallback(item)
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>

                <Task 
                    className = "item-col task-col"
                    taskChangeCallback = {this.taskChange}
                    description = {listItem.description}
                    id = {listItem.id}
                />

                <DueDate 
                    className = "item-col due-date-col"
                    dueDateChangeCallback = {this.dueDateChange}
                    dueDate = {listItem.due_date}
                    id = {listItem.id}
                />



                {/* <div className='item-col task-col' onClick={this.handleTaskChange}>{listItem.description}</div> 
                <div className='item-col due-date-col'>{listItem.due_date}</div>*/}
                <div className='item-col status-col' className={statusType}>{listItem.status}</div>
                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp 
                        className='list-item-control todo-button' 
                    />
                    <KeyboardArrowDown 
                        className='list-item-control todo-button' 
                    />
                    <Close 
                        className='list-item-control todo-button' 
                        onClick={this.removingItem}
                    />
                    <div className='list-item-control'></div>
                    <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;
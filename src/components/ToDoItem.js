// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import Task from './Task'
import DueDate from './DueDate'
import Status from './Status'

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

    statusChange = (idNum, oldStatus, newStatus) => {
        let item = this.props.toDoListItem;
        let itemTask = item.description;
        let itemDate = item.due_date;
    
        this.props.updateItemCallback(idNum, itemTask, itemTask, itemDate, itemDate, oldStatus, newStatus )
    }

    movingItemUp = () => {
        let id = this.props.toDoListItem.id;
        if (this.props.startId !== id){
            this.props.moveItemUpCallback(id);
        }
    }

    movingItemDown = () => {
        let id = this.props.toDoListItem.id;
        if (this.props.endId !== id){
            this.props.moveItemDownCallback(id);
        }
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
                <Status 
                    className1 = {`item-col status-col ${statusType}`}
                    className = "item-col status-col"
                    statusChangeCallback = {this.statusChange}
                    status = {listItem.status}
                    id = {listItem.id}
                />
                <div className='item-col list-controls-col'>
                    <div className='list-item-control'>
                    <KeyboardArrowUp 
                        className='todo-button'
                        onClick={this.movingItemUp} 
                        color={(this.props.startId === listItem.id) ? "disabled" : "inherit"}
                        style={(this.props.startId === listItem.id) ? { pointerEvents: "none" } : {}}
                    />
                    </div>
                    <div className='list-item-control'>
                    <KeyboardArrowDown 
                        className='list-item-control todo-button' 
                        onClick={this.movingItemDown}
                        color={(this.props.endId === listItem.id) ? "disabled" : "inherit"}
                        style={(this.props.endId === listItem.id) ? { pointerEvents: "none" } : {}}
                    />
                    </div>
                    <div className='list-item-control'>
                    <Close 
                        className='list-item-control todo-button' 
                        onClick={this.removingItem}
                    />
                    </div>
                    <div className='list-item-control'></div>
                    <div className='list-item-control'></div>
                </div>
            </div>
        );
    }
}

export default ToDoItem;
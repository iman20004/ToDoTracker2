// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }

    handleAddNewItem = () => {
        if (!this.props.addItemDisabled){
            this.props.addNewListItemCallback();
        }
    }

    handleDeleteList = () => {
        if (!this.props.trashDisabled){
            this.props.deleteListCallback();
        }
    }

    handleCloseList = () => {
        if (!this.props.closeDisabled){
            this.props.closeListCallback();
        }
    }

  
    render() {
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexdirection="row" flexwrap="nowrap">
                        <div className="list-item-control"/>
                        <div className="list-item-control"/>
                        <div className="list-item-control">
                            <AddBox 
                                id="add-item-button" 
                                className="material-icons todo-button" 
                                onClick={this.handleAddNewItem}
                                color={this.props.addItemDisabled ? "disabled" : "inherit"}
                                style={this.props.addItemDisabled ? { pointerEvents: "none" } : {}}
                            />
                        </div>
                        <div className="list-item-control">
                            <Delete 
                                id="delete-list-button" 
                                className="material-icons todo-button" 
                                onClick={this.handleDeleteList}
                                color={this.props.trashDisabled ? "disabled" : "inherit"}
                                style={this.props.trashDisabled ? { pointerEvents: "none" } : {}}
                            />
                        </div>
                        <div className="list-item-control">
                            <Close 
                                id="close-list-button" 
                                className="material-icons todo-button" 
                                onClick={this.handleCloseList}
                                color={this.props.closeDisabled ? "disabled" : "inherit"}
                                style={this.props.closeDisabled ? { pointerEvents: "none" } : {}}
                            />
                        </div>
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            updateItemCallback = {this.props.updateItemCallback}
                            removeItemCallback = {this.props.removeItemCallback}
                            moveItemUpCallback={this.props.moveItemUpCallback}
                            moveItemDownCallback={this.props.moveItemDownCallback}
                            startId={this.props.startId}
                            endId={this.props.endId}
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;
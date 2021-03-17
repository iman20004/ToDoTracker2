// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import ListLink from './ListLink'
import AddBox from '@material-ui/icons/AddBox';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';

class LeftSidebar extends Component {
    constructor(props) {
        super(props);
    }

    handleAddNewList = () => {
        console.log("acha")
        if (!this.props.addNewDisabled){
            console.log("woah")
            this.props.addNewListCallback();
        }
    }

    render() {
        return (
            <div id="left-sidebar">
                <div id="left-sidebar-header" className="section-header">
                    <span className="left-sidebar-header-text">Todolists</span>
                    <span className="left-sidebar-controls" id="add-undo-redo-box">
                        <AddBox 
                            id = {this.props.addNewDisabled === true ? "" : "add-list-button"}
                            className="material-icons todo_button"
                            onClick={this.handleAddNewList} 
                            color={this.props.addNewDisabled === true ? "disabled" : "inherit"}
                            style={this.props.addNewDisabled ? { pointerEvents: "none" } : {}}
                        />
                        <Undo 
                            id="undo-button" 
                            className="list-item-control material-icons todo-button" 
                            onClick={this.props.undoCallback}
                            color={this.props.undoDisable === true ? "disabled" : "inherit"}
                            style={this.props.undoDisable ? { pointerEvents: "none" } : {}}
                        />
                        <Redo 
                            id="redo-button" 
                            className="list-item-control material-icons todo-button" 
                            onClick={this.props.redoCallback}
                            color={this.props.redoDisable === true ? "disabled" : "inherit"}
                            style={this.props.redoDisable ? { pointerEvents: "none" } : {}}
                        />
                    </span>
                </div>
                <div id="todo-lists-list">
                {
                    this.props.toDoLists.map((toDoList) => (
                        <ListLink
                            key={toDoList.id}
                            toDoList={toDoList}                                // PASS THE LIST TO THE CHILDREN
                            loadToDoListCallback={this.props.loadToDoListCallback}   // PASS THE CALLBACK TO THE CHILDREN
                            listNameChangeCallback={this.props.listNameChangeCallback} /> 
                    ))
                }
                </div>
            </div>
        );
    }
}

export default LeftSidebar;
// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editName: false
        }
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    changeListName = () => {
        this.setState({
            editName: true
        })
    }

    stopEditName = (e) => {
        this.setState({
            editName: false
        })

        let source = e.target
        let newName = source.value
        let oldName = this.props.toDoList.name

        if (oldName !== newName){
            this.props.listNameChangeCallback(newName);
        }
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");

        if (this.state.editName === false){
            return (
                <div 
                    className={this.props.currentListId === this.props.toDoList.id ? "highlighted-list todo-list-button": "todo-list-button"}
                    onClick={this.handleLoadList}
                    onDoubleClick={this.changeListName}
                >
                    {this.props.toDoList.name}<br />
                </div>
            ) 
        }
        else {
            return (
                <div className="todo-list-button highlighted-list">
                    <input
                        className = "name-input"
                        type = "text"
                        defaultValue = {this.props.toDoList.name}
                        style = {{backgroundColor: 'transparent'}}
                        onBlur = {this.stopEditName}
                        autoFocus
                    />
                </div>
            ) 
        }
    }
}

export default ListLink;
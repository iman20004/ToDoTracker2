// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS' // WE NEED THIS TOO
import UpdateItem_Transaction from './common/UpdateItem_Transaction'
import AddNewItem_Transaction from './common/AddNewItem_Transaction'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    //localStorage.clear();
    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    });
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      id: this.state.nextListItemId,
      description: "No Description",
      due_date: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  addNewListItem= (newItem) =>  {
    let addToList = this.state.currentList
    addToList.items.push(newItem)
  
    this.setState({
      currentList: addToList,
      nextListItemId: this.state.nextListItemId+1
    }, this.afterToDoListsChangeComplete);
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // SAVING TO LOCAL STORAGE
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recentLists", toDoListsString);
  }

  // TRANSACTION FOR ITEM UPDATE
  addUpdateItemTransaction = (id, oldTask, newTask, oldDate, newDate, oldStatus, newStatus) => {
    let transaction = new UpdateItem_Transaction(this, id, oldTask, newTask, oldDate, newDate, oldStatus, newStatus);
    this.tps.addTransaction(transaction);
  }

  // UPDATING ITEM TASK/DATE/STATUS FIELDS
  updateItem = (itemId, desc, date, stat) => {
    let updatedList = this.state.currentList
    updatedList.items.map((item) => {
      if (item.id === itemId){
          item.description = desc
          item.due_date = date
          item.status = stat
      }
    })

    this.setState(
      {
        currentList: updatedList
      }, this.afterToDoListsChangeComplete
    );
  }


  // TRANSACTION FOR ADDING NEW ITEM 
  addNewListItemTransaction = () => {
    let transaction = new AddNewItem_Transaction(this);
    this.tps.addTransaction(transaction);
  }

  removeItem = (itemID) => {
    const newListItems = this.state.currentList.items.filter(item => item.id !== itemID);
    let newList = this.makeNewToDoList();
    newList.id = this.state.currentList.id;
    newList.name = this.state.currentList.name;
    newList.items = newListItems;

    let prepList = this.state.toDoLists.filter(obj => obj.id !== this.state.currentList.id)
    let newTodoList = [...[newList], ...prepList];
    
    this.setState(
      {
        toDoLists: newTodoList,
        currentList: newList,
        nextListItemId: this.state.nextListItemId-1
      }, this.afterToDoListsChangeComplete
    );

  }


  undo = () =>  {
    if (this.tps.hasTransactionToUndo()) {
      this.tps.undoTransaction();
    }
  } 

  redo = () =>  {
    if (this.tps.hasTransactionToRedo()) {
      this.tps.doTransaction();
    }
  }


  render() {
    let items = this.state.currentList.items;
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          undoCallback={this.undo}
          redoCallback={this.redo}
        />
        <Workspace toDoListItems={items}
          updateItemCallback={this.addUpdateItemTransaction}
          addNewListItemCallback={this.addNewListItemTransaction} 
        />
      </div>
    );
  }
}

export default App;
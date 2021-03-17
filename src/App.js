// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS' // WE NEED THIS TOO
import UpdateItem_Transaction from './common/UpdateItem_Transaction'
import AddNewItem_Transaction from './common/AddNewItem_Transaction'
import RemoveItem_Transaction from './common/RemoveItem_Transaction'
import MoveItem_Transaction from './common/MoveItem_Transaction'
import Modal from './components/Modal'


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
      useVerboseFeedback: true,
      modalShow: false,
      addListDisabled: false,
      addNewItemDisabled: true,
      trashListDisabled: true,
      closeListDisabled: true
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

    this.tps.clearAllTransactions();

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList,
      addListDisabled: true,
      addNewItemDisabled: false,
      trashListDisabled: false,
      closeListDisabled: false
    }, this.afterToDoListsChangeComplete);
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    this.tps.clearAllTransactions();

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1,
      addListDisabled: true,
      addNewItemDisabled: false,
      trashListDisabled: false,
      closeListDisabled: false
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
    let addToList = JSON.parse(JSON.stringify(this.state.currentList));
    addToList.items.push(newItem)

    let prepList = this.state.toDoLists.filter(obj => obj.id !== this.state.currentList.id)
    let newTodoList = [...[addToList], ...prepList];
  
    this.setState({
      toDoLists: newTodoList,
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
    let updatedList = JSON.parse(JSON.stringify(this.state.currentList));
    updatedList.items.map((item) => {
      if (item.id === itemId){
          item.description = desc
          item.due_date = date
          item.status = stat
      }
    })

    let prepList = this.state.toDoLists.filter(obj => obj.id !== this.state.currentList.id)
    let newTodoList = [...[updatedList], ...prepList];

    this.setState(
      {
        toDoLists: newTodoList,
        currentList: updatedList
      }, this.afterToDoListsChangeComplete
    );
  }


  // TRANSACTION FOR ADDING NEW ITEM 
  addNewListItemTransaction = () => {
    let transaction = new AddNewItem_Transaction(this);
    this.tps.addTransaction(transaction);
  }

  addRemoveItemTransaction = (item) => {
    let itemID = item.id;
    let listIndex = -1;
      for (let i = 0; (i < this.state.currentList.items.length); i++) {
        if (this.state.currentList.items[i].id === itemID)
          listIndex = i;
      }

    let transaction = new RemoveItem_Transaction(this, item, listIndex);
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
    
    let nextItemId = this.state.nextListItemId
    if (itemID === (this.state.nextListItemId-1)) {
      nextItemId = this.state.nextListItemId - 1
    }
    
    this.setState(
      {
        toDoLists: newTodoList,
        currentList: newList,
        nextListItemId: nextItemId
      }, this.afterToDoListsChangeComplete
    );

  }

  deleteListConfirmation = () => {
    this.setState(
      {
        modalShow: true
      }
    );
  }

  closeDeleteModal = () => {
    this.setState(
      {
        modalShow: false
      }
    );
  }

  deleteList = () => {
    let prepList = this.state.toDoLists.filter(obj => obj.id !== this.state.currentList.id)
    this.tps.clearAllTransactions();

    this.setState(
      {
        toDoLists: prepList,
        currentList: {items: []},
        addListDisabled: false,
        addNewItemDisabled: true,
        trashListDisabled: true,
        closeListDisabled: true,
        modalShow: false
      }, this.afterToDoListsChangeComplete
    );
  }

  closeList = () => {
    this.tps.clearAllTransactions();

    this.setState(
      {
        currentList: {items: []},
        addListDisabled: false,
        addNewItemDisabled: true,
        trashListDisabled: true,
        closeListDisabled: true
      }, this.afterToDoListsChangeComplete
    );
  }

  addNewListItemAtIndex = (itemToAdd, index) => {
    let addToList = JSON.parse(JSON.stringify(this.state.currentList));
    addToList.items.splice(index, 0, itemToAdd);

    let prepList = this.state.toDoLists.filter(obj => obj.id !== this.state.currentList.id)
    let newTodoList = [...[addToList], ...prepList];

    this.setState({
      toDoLists: newTodoList,
      currentList: addToList,
      nextListItemId: this.state.nextListItemId+1
    }, this.afterToDoListsChangeComplete);

  }

  moveItemUp = (itemID) => {
    let listIndex = -1;
      for (let i = 0; (i < this.state.currentList.items.length); i++) {
        if (this.state.currentList.items[i].id === itemID)
          listIndex = i;
      }

    this.addMoveItemTransaction(listIndex, listIndex-1)
  }

  moveItemDown = (itemID) => {
    let listIndex = -1;
      for (let i = 0; (i < this.state.currentList.items.length); i++) {
        if (this.state.currentList.items[i].id === itemID)
          listIndex = i;
      }

    this.addMoveItemTransaction(listIndex, listIndex+1)
  }

  addMoveItemTransaction = (start, dest) => {
    let transaction = new MoveItem_Transaction(this, start, dest);
    this.tps.addTransaction(transaction);
  }

  moveItem = (fromIndex, toIndex) => {
    let newCurrentList = JSON.parse(JSON.stringify(this.state.currentList));
    newCurrentList.items.splice(toIndex, 0, newCurrentList.items.splice(fromIndex, 1)[0]);
    
    let prepList = this.state.toDoLists.filter(obj => obj.id !== this.state.currentList.id)
    let newTodoList = [...[newCurrentList], ...prepList];

    this.setState({
      toDoLists: newTodoList,
      currentList: newCurrentList
    }, this.afterToDoListsChangeComplete);
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

  componentDidMount = () => {
    document.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.keydownHandler);
  }

  keydownHandler = (event) => {

    if (event.ctrlKey) {
      if (event.keyCode === 90) {
        if (this.tps.hasTransactionToUndo()) {
          this.undo();
        }
        event.preventDefault();
      }
      
      else if (event.keyCode === 89){
        this.redo();
      }
    } 

  }

  listNameChange = (newName) => {
    let newCurrentList = JSON.parse(JSON.stringify(this.state.currentList));
    newCurrentList.name = newName

    let prepList = this.state.toDoLists.filter(obj => obj.id !== this.state.currentList.id)
    let newTodoList = [...[newCurrentList], ...prepList];

    this.setState({
      toDoLists: newTodoList,
      currentList: newCurrentList
    }, this.afterToDoListsChangeComplete);

  }


  render() {
    let items = this.state.currentList.items;
    let startId = -1
    let endId = -1
    if (items.length !== 0){
      startId = items[0].id
      endId = items[items.length -1].id
    }

    let undoDisable = true;
    if (this.tps.hasTransactionToUndo()){
      undoDisable = false;
    }
    let redoDisable = true;
    if (this.tps.hasTransactionToRedo()){
      redoDisable = false;
    }

    return (
      <div id="container">

        <div id="app">
          <Navbar />
          <LeftSidebar 
            toDoLists={this.state.toDoLists}
            loadToDoListCallback={this.loadToDoList}
            addNewListCallback={this.addNewList}
            addNewDisabled={this.state.addListDisabled}
            undoCallback={this.undo}
            redoCallback={this.redo}
            undoDisable={undoDisable}
            redoDisable={redoDisable}

            listNameChangeCallback= {this.listNameChange}
          />
          <Workspace 
            toDoListItems={items}
            updateItemCallback={this.addUpdateItemTransaction}
            addNewListItemCallback={this.addNewListItemTransaction} 
            removeItemCallback={this.addRemoveItemTransaction}
            deleteListCallback={this.deleteListConfirmation}
            closeListCallback={this.closeList}
            moveItemUpCallback={this.moveItemUp}
            moveItemDownCallback={this.moveItemDown}
            keydownCallback={this.keydownHandler}
            addItemDisabled={this.state.addNewItemDisabled}
            trashDisabled={this.state.trashListDisabled}
            closeDisabled={this.state.closeListDisabled}
            startId={startId}
            endId={endId}
          />
        </div>

        <Modal
          className={this.state.modalShow === true ? "modal-visible" : "modal"}
          closeDeleteModalCallback = {this.closeDeleteModal}
          deleteListCallback = {this.deleteList}
        />
        
      
      </div>
    );
  }
}

export default App;
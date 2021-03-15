'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItem_Transaction extends jsTPS_Transaction {
    constructor(app) {
        super();
        this.app = app;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.itemAdded = this.app.makeNewToDoListItem();
        this.app.addNewListItem(this.itemAdded);
    }

    undoTransaction() {
        this.app.removeItem(this.itemAdded.id);
    }
}
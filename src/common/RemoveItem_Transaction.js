'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class RemoveItem_Transaction extends jsTPS_Transaction {
    constructor(app, item, index) {
        super();
        this.app = app;
        this.item = item;
        this.index = index;
    }

    doTransaction() {
        this.app.removeItem(this.item.id);
    }

    undoTransaction() {
        this.app.addNewListItemAtIndex(this.item, this.index);
    }
}
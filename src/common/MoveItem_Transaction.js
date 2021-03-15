'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./jsTPS.js"

// THIS TRANSACTION IS FOR MOVING AN ITEM
export default class MoveItem_Transaction extends jsTPS_Transaction {
    constructor(app, initStartIndex, initDestIndex) {
        super();
        this.app = app;
        this.startIndex = initStartIndex;
        this.destIndex = initDestIndex;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.app.moveItem(this.startIndex, this.destIndex);
    }

    undoTransaction() {
        this.app.moveItem(this.destIndex, this.startIndex);
    }
}
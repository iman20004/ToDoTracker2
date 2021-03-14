'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./jsTPS.js"

export default class UpdateItem_Transaction extends jsTPS_Transaction {
    constructor(app, initItemId, initOldDescription, initNewDescription, initOldDueDate, initNewDueDate, initOldStatus, initNewStatus) {
        super();
        this.app = app;
        this.itemId = initItemId;
        this.oldDescription = initOldDescription;
        this.newDescription = initNewDescription;
        this.oldDueDate = initOldDueDate;
        this.newDueDate = initNewDueDate;
        this.oldStatus = initOldStatus;
        this.newStatus = initNewStatus;
    }

    doTransaction() {
        this.app.updateItem(this.itemId, this.newDescription, this.newDueDate, this.newStatus);
    }

    undoTransaction() {
        this.app.updateItem(this.itemId, this.oldDescription, this.oldDueDate, this.oldStatus);
    }
}
import React, { Component } from 'react'

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    closeModal = () => {
        this.props.closeDeleteModalCallback();
    }

    handleDelete = () => {
        this.props.deleteListCallback();
    }

    render() {
        return(
            <div id="my-modal" class={this.props.className}>
                <div class="modal-content">
                    <div class="modal-header">
                        <div id="modal-title">Delete List?</div>
                        <div id="modal-close-button">
                            <span id="modal-close" class="modal-control" onClick= {this.closeModal} >&times;</span>
                        </div>
                    </div>
                    <div class="modal-body">
                        <span id="modal-confirm" class="modal-button modal-control" onClick= {this.handleDelete}>Confirm</span>
                        <span class="modal-button"></span>
                        <span class="modal-button"></span>
                        <span id="modal-cancel" class="modal-button modal-control" onClick= {this.closeModal} >Cancel</span>
                    </div>
                </div>
            </div>
        );
    }

}

export default Modal;
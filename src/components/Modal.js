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
            <div id="my-modal" className={this.props.className}>
                <div className="modal-content">
                    <div className="modal-header">
                        <div id="modal-title">Delete List?</div>
                        <div id="modal-close-button">
                            <span id="modal-close" className="modal-control" onClick= {this.closeModal} >&times;</span>
                        </div>
                    </div>
                    <div className="modal-body">
                        <span id="modal-confirm" className="modal-button modal-control" onClick= {this.handleDelete}>Confirm</span>
                        <span className="modal-button"></span>
                        <span className="modal-button"></span>
                        <span id="modal-cancel" className="modal-button modal-control" onClick= {this.closeModal} >Cancel</span>
                    </div>
                </div>
            </div>
        );
    }

}

export default Modal;
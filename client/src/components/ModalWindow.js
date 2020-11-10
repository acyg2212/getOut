import React from 'react';

const ModalWindow = (props) => {
    const onClose = e => {
        props.onClose && props.onClose(e);
    };

    if (props.show === false) {
        return null;
    }
    return (
        <div className="modal-div" >
            <div className="button-container">
                <button className="toggle-button" onClick={onClose}>x</button>
            </div>
            <div className="create-adventure-container">
                <h2 className="create-post-headline">Create Your Outdoor Experience</h2>
                <form id="adventure-create-form" >


                </form>
            </div>
        </div >
    );
}

export default ModalWindow;
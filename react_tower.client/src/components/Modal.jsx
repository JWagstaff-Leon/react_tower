import React from 'react';

const Modal = ({ modalTitle, modalBody, elementId }) => {
    return (
    <div id={elementId} className="modal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-primary">
                <div className="modal-header border-lightdark">
                    {modalTitle}
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {modalBody}
                </div>
            </div>
        </div>
    </div>
    );
}
 
export default Modal;
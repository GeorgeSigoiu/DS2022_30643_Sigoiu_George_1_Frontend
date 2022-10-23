import React from 'react'

const Modal = ({ modalId, title, content, btnMessage, execute }) => {

    return (
        <div className="modal fade" id={modalId}>
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">{title}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        {content}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={execute}>{btnMessage}</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal
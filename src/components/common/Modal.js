import React from 'react'

const Modal = ({ modalId, title, content, btnMessage, execute }) => {

    async function closeModal() {
        const canClose = await execute()
        if (canClose !== "don't close") {
            const modal = document.getElementById(modalId)
            modal.classList.remove("show")
            const modalBack = document.querySelector(".modal-backdrop")
            const parent = modalBack.parentNode
            parent.removeChild(modalBack)
            const body = document.querySelector("body")
            body.classList.remove("modal-open")
            body.style = ""
            let btn = document.getElementById("btn-inser-user")
            if (btn === null || btn === undefined) {
                btn = document.getElementById("btn-add-device")
            }
            btn.click()
        }
    }

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
                        <button type="button" className="btn btn-success" /*data-bs-dismiss="modal"*/ onClick={closeModal} id={`${modalId}-btn`}>{btnMessage}</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal
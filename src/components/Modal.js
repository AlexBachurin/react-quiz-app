import React from 'react'
import { useGlobalContext } from '../context'
const Modal = () => {
    const { correct, questions, isModalOpen, closeModal } = useGlobalContext()
    return (
        <div className={isModalOpen ? `modal-container isOpen` : `modal-container`}>
            <div className="modal-content">
                <h2>congrats you completed the quiz!</h2>
                <p>You answered {correct} of {questions.length} </p>
                <button className="close-btn" onClick={closeModal}>play again</button>
            </div>
        </div>
    )
}

export default Modal

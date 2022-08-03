import React, { useState } from 'react';
import Modal from 'react-modal';

const ModalElement = ({ inputText, modalTitle, callback }) => {
    const [text, setText] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            backdrop: 'blur'
        },
    };

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const onPostSubmit = (e) => {
        e.preventDefault();
        callback(text);
        setText('');
        setIsOpen(false);
    }

    Modal.setAppElement(document.getElementById('root'));

    return (
        <>
            <div className='open-modal' onClick={openModal}>
                <div className='input-type'> {inputText} </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='modal-top-div'>
                    <h2 className='modal-title'> {modalTitle} </h2>
                    <button onClick={closeModal} className="modal-close">x</button>
                </div>
                <hr />
                <form className="form my-1" onSubmit={onPostSubmit}>
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Create a post"
                        required
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>

            </Modal>
        </>
    )
}

export default ModalElement;
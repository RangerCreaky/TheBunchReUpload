import React from 'react';
import Modal from 'react-modal';
import { addPostAction } from '../../actions/post';
import { useDispatch } from 'react-redux';
import ModalElement from '../modal/ModalElement';
const PostForm = () => {
    const dispatch = useDispatch();

    Modal.setAppElement(document.getElementById('root'));

    const addPost = (text) => {
        dispatch(addPostAction(text));
    }

    return (
        <div className="post-form">
            <ModalElement
                inputText="Say something to your bunch"
                modalTitle="Post Something"
                callback={addPost}
            />
        </div>
    )
}

export default PostForm;
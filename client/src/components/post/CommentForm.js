import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentAction } from '../../actions/post';
import Modal from 'react-modal';
import ModalElement from '../modal/ModalElement';


const CommentForm = ({ postid }) => {
    const dispatch = useDispatch();
    const addComment = (text) => {
        dispatch(addCommentAction(postid, text));
    }
    return (
        <div className="post-form">
            <ModalElement
                inputText="Leave a comment"
                modalTitle="Leave a comment"
                callback={addComment}
            />
        </div>
    )
}

export default CommentForm

import { DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from "./types";
import axios from 'axios';
import { setAlert } from './alert';

// get all posts
export const getPostsAction = () => async dispatch => {
    try {
        const response = await axios.get("api/posts");

        dispatch({
            type: GET_POSTS,
            payload: response.data
        })
    } catch (error) {
        dispatch(
            {
                type: POST_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }
        )
    }
}

// get all posts
export const getPostAction = (id) => async dispatch => {
    try {
        const response = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: response.data
        })
    } catch (error) {
        dispatch(
            {
                type: POST_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }
        )
    }
}

// add a Like
export const addLikeAction = (postid) => async dispatch => {
    try {
        const response = await axios.put(`api/posts/like/${postid}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id: postid,
                likes: response.data
            }
        })
    } catch (error) {
        dispatch(
            {
                type: POST_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }
        )
    }
};

// Remove a like
export const removeLikeAction = (postid) => async dispatch => {
    try {
        const response = await axios.put(`api/posts/unlike/${postid}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id: postid,
                likes: response.data
            }
        })
    } catch (error) {
        dispatch(
            {
                type: POST_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }
        )
    }
};

// Delete a post
export const deletePostAction = (postid) => async dispatch => {
    try {
        await axios.delete(`api/posts/${postid}`);

        dispatch({
            type: DELETE_POST,
            payload: postid
        });

        dispatch(setAlert('post deleted', 'success'));
    } catch (error) {
        dispatch(
            {
                type: POST_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }
        )
    }
};

// Add a post
export const addPostAction = (formData) => async dispatch => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }
    // const body = JSON.stringify(formData);
    try {
        const response = await axios.post(`/api/posts`, {
            text: formData
        });
        // console.log(response);
        dispatch({
            type: ADD_POST,
            payload: response.data
        });

        dispatch(setAlert('post created', 'success'));
    } catch (error) {
        // console.log(error);
        dispatch(
            {
                type: POST_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }
        )
    }
};

// Add a comment
export const addCommentAction = (postid, formData) => async dispatch => {
    try {
        const response = await axios.post(`/api/posts/comment/${postid}`, {
            text: formData
        });
        // console.log(response);
        dispatch({
            type: ADD_COMMENT,
            payload: response.data
        });

        dispatch(setAlert('Comment added', 'success'));
    } catch (error) {
        dispatch(
            {
                type: POST_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }
        )
    }
};

// Delete a comment
export const deleteCommentAction = (postid, commentid) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postid}/${commentid}`);
        // console.log(response);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentid
        });

        dispatch(setAlert('Comment removed', 'success'));
    } catch (error) {
        dispatch(
            {
                type: POST_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }
        )
    }
};



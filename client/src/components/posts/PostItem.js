import React from 'react';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { addLikeAction, removeLikeAction, deletePostAction } from '../../actions/post';


const PostItem = ({ post, showActions, showDelete = true }) => {

    const auth = useSelector((state) => {
        return state.auth;
    });

    const dispatch = useDispatch();
    if (!post) {
        return <Spinner />
    }

    const { _id, text, name, avatar, user, likes, comments, date } = post;
    const addClick = () => {
        dispatch(addLikeAction(_id));
    };

    const removeLike = () => {
        dispatch(removeLikeAction(_id));
    };

    const deletePost = () => {
        dispatch(deletePostAction(_id));
    }

    const numLikes = (len) => {
        if (len === 0) {
            return '';
        }
        else if (len === 1) {
            return 'like';
        }
        else {
            return 'likes';
        }
    }
    return (
        <div className="post-custom bg-white p-1 my-1">
            <div className='div-details'>
                <div>
                    <NavLink to={`/profile/${user}`}>
                        <img
                            className="round-img post-avatar"
                            src={avatar}
                            alt=""
                        />
                    </NavLink>
                </div>
                <div>
                    <NavLink to={`/profile/${user}`} className="post-title-a"> <h4 className='post-title'>{name}</h4></NavLink>
                    <p className="post-date">
                        Posted on {date.slice(0, 10)}
                    </p>
                    <p className="my-1 post-body">
                        {text}
                    </p>
                    {showActions && <>
                        <div className="post-icon-buttons">
                            <button type="button" className="like like-count" onClick={addClick}>
                                <i class="fas fa-solid fa-thumbs-up"></i>{' '}
                                <span>{likes?.length > 0 && (
                                    <span className='comment-count'>{likes.length} {numLikes(likes.length)}</span>
                                )}</span>
                            </button>
                            <button type="button" className="like" onClick={removeLike}>
                                <i className="fas fa-thumbs-down"></i>
                            </button>
                            <NavLink to={`/posts/${_id}`} className="like comment">
                                <i class="fas fa-regular fa-comment"></i> {comments?.length > 0 && (
                                    <span className='comment-count'>{comments.length}</span>
                                )}
                            </NavLink>
                        </div>
                    </>}
                </div>
            </div>
            {showDelete && !auth?.loading && user === auth?.user?._id && (
                <button
                    type="button"
                    className="btn btn-danger delete-post"
                    onClick={deletePost}
                >
                    <i className="fas fa-times"></i>
                </button>
            )}
        </div >
    );
}

PostItem.defaultProps = {
    showActions: true
}

export default PostItem;
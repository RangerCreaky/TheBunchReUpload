import React from 'react';
import { NavLink } from 'react-router-dom';
import { deleteCommentAction } from '../../actions/post';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';

const CommentItem = ({ postid, comment }) => {

    const auth = useSelector((state) => {
        return state.auth
    });
    const dispatch = useDispatch();
    const deleteComment = () => {
        dispatch(deleteCommentAction(postid, _id))
    }

    if (!comment) {
        return <Spinner />
    }

    const { _id, text, name, avatar, user, date } = comment;
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
                </div>
            </div>
            {!auth?.loading && user === auth?.user?._id && (
                <button
                    type="button"
                    className="btn btn-danger delete-post"
                    onClick={deleteComment}
                >
                    <i className="fas fa-times"></i>
                </button>
            )}


            {/* <div>
                <NavLink to={`/profile/${user}`}>
                    <img
                        className="round-img"
                        src={avatar}
                        alt=""
                    />
                    <h4>{name}</h4>
                </NavLink>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    {date.slice(0, 10)}
                </p>
                {!auth?.loading && user === auth?.user?._id && (
                    <button onClick={deleteComment} type="button" className='btn btn-danger'>
                        <i className="fas fa-times"></i>
                    </button>
                )}
            </div> */}
        </div>
    )
}

export default CommentItem;
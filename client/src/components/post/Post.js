import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostAction } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Alert from '../layout/Alert';

const Post = () => {

    const { post, loading } = useSelector((state) => {
        return { post: state.post.post, loading: state.post.loading }
    });
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getPostAction(id));
    }, [dispatch, id]);

    const renderComments = () => {
        return post.comments.map((comment) => {
            return <CommentItem key={comment?._id} postid={post?._id} comment={comment} />
        })
    }

    if (loading || !post) {
        return <Spinner />
    }
    return (
        <div className='container'>
            <Alert />
            <NavLink to="/posts" className="bunch-edit-button"> Back to Posts </NavLink>
            <PostItem post={post} showActions={false} showDelete={false} />
            <CommentForm postid={post?._id} />

            <h3 style={{ textAlign: 'center' }}> Comments </h3>
            <div className="comments">
                {renderComments()}
            </div>
        </div>
    )
}

export default Post;
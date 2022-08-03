import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import PostItem from './PostItem';
import { getPostsAction } from '../../actions/post';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from './PostForm';


const Posts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPostsAction());
    }, [dispatch]);

    const { posts, loading } = useSelector((state) => {
        return {
            posts: state.post.posts,
            loading: state.post.loading
        }
    });

    const renderPosts = () => {
        return posts.map((post) => {
            return <PostItem key={post._id} post={post} />
        });
    }

    if (loading) {
        return <div className='container'><Spinner /></div>
    }
    return (
        <div className='container'>
            <Alert />
            <h1 class="post-outer-heading">Bunch Space</h1>
            <p className="lead title-tag post-outer-heading">
                <i className="fas fa-user"></i>{' '} Welcome to the community
            </p>

            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <p>Some text in the Modal..</p>
                </div>
            </div>

            {/* postform */}
            <PostForm />

            <div className="posts">
                {renderPosts()}
            </div>
        </div>
    )
}

export default Posts;
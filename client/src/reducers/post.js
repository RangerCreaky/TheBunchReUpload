import { ADD_POST, DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from "../actions/types"

const initialState = {
    posts: [],
    post: null,
    error: {},
    loading: true
}

const postReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }

        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }

        case POST_ERROR:
            return {
                ...state,
                error: payload
            }

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => {
                    return post._id !== payload
                }),
                loading: false
            }

        case GET_POST:
            return {
                ...state,
                post: payload
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    // If the post id in the array equal to the post id we sent through payload
                    // Means if this post is the one liked
                    return (post._id === payload.id ? { ...post, likes: payload.likes } : post)
                }),
                loading: false
            }

        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false
            }

        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter((comment) => {
                        return comment._id !== payload
                    }),
                },
                loading: false
            }
        default:
            return state;
    }
}

export default postReducer;


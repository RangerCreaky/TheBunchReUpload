import { BUNCH_ERROR, LOAD_BUNCH, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, ACCOUNT_DELETED, CREATE_BUNCH } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    inBunch: null,
    loading: true,
    user: null,
    bunch: null
}

const registerReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case BUNCH_ERROR:
            localStorage.setItem('token', localStorage.getItem('logged_token'))
            return {
                token: localStorage.getItem('logged_token'),
                inBunch: false,
                loading: false,
                bunch: null,
            }
        case LOAD_BUNCH:
            return {
                ...state,
                bunch: payload,
                inBunch: true,
                loading: false,
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            localStorage.setItem('logged_token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }

        case CREATE_BUNCH:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                inBunch: true,
                loading: true,
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            console.log("I am in reducer here");
            localStorage.removeItem('token');
            localStorage.removeItem('logged_token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                bunch: null,
                user: null,
                inBunch: null
            }
        default:
            return state;
    }
}

export default registerReducer;

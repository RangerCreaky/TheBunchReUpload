import { LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, CLEAR_PROFILE, BUNCH_ERROR } from "./types";
import { setAlert } from "./alert";
import axios from 'axios';
import setAuthHeader from "../utils/setAuthHeader";

export const loadUserAction = () => async dispatch => {
    // First set the token from local storage in ur header
    console.log("token : ", localStorage.token);

    setAuthHeader(localStorage.token);

    // Now make a call to the endpoint api/users
    try {
        const response = await axios.get('/api/auth');
        dispatch(
            {
                type: USER_LOADED,
                payload: response.data
            }
        )
    } catch (error) {
        dispatch({ type: AUTH_ERROR });
    }
}

export const logoutAction = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
}

export const loginAction = ({ email, password }) => async dispatch => {
    // First send the name , email , password to the
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const body = JSON.stringify({ email, password });

        const response = await axios.post('/api/auth', body, config);
        // console.log(response);
        dispatch(
            {
                type: LOGIN_SUCCESS,
                payload: response.data
            }
        )

        // If the user successfully logged in then load the user
        // Call the loadUserAction
        dispatch(loadUserAction());

    } catch (err) {
        const errors = err.response.data.errors;
        // If there is an error then we need to show that error
        // this error is an array of errors
        console.log(err);
        errors.map((error) => dispatch(setAlert(error, 'danger')));

        // Now dispatch the failure register
        // Here the reducer just removes the token from localStorage
        // So no payload required
        dispatch(
            {
                type: LOGIN_FAIL
            }
        )

    }

};

export const registerAction = ({ name, email, password }) => async dispatch => {
    // First send the name , email , password to the
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const body = JSON.stringify({ name, email, password });

        const response = await axios.post('/api/users', body, config);

        dispatch(
            {
                type: REGISTER_SUCCESS,
                payload: response.data
            }
        )
        dispatch(loadUserAction());


    } catch (err) {
        const errors = err.response.data.errors;
        // If there is an error then we need to show that error
        // this error is an array of errors
        errors.map((error) => dispatch(setAlert(error, 'danger')));

        // Now dispatch the failure register
        // Here the reducer just removes the token from localStorage
        // So no payload required
        dispatch(
            {
                type: REGISTER_FAIL
            }
        )

    }

};

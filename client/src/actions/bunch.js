import axios from 'axios';
import { BUNCH_ERROR, CREATE_BUNCH, LOAD_BUNCH } from './types';
import setAuthHeader from '../utils/setAuthHeader';
import { setAlert } from './alert';
import { loadUserAction } from './auth';

export const loadBunchAction = () => async dispatch => {
    if (localStorage.token) {
        setAuthHeader(localStorage.token);
    }
    try {
        // make a get call to get the bunch data from the endpoint
        const response = await axios.get("/api/bunch");
        dispatch({
            type: LOAD_BUNCH,
            payload: response.data
        });

    } catch (error) {

    }
}

export const exitAction = () => async dispatch => {
    dispatch({ type: BUNCH_ERROR });
}

export const editBuncAction = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const body = JSON.stringify(formData);
        const response = await axios.post('/api/bunch/edit', body, config);

        dispatch({
            type: LOAD_BUNCH,
            payloac: response.data
        });

        dispatch(setAlert('Bunch details edited', 'success'));
    } catch (error) {
        dispatch({ type: BUNCH_ERROR });
    }
}

export const createBunchAction = ({ name, secret }) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const body = JSON.stringify({ name, secret });
        const response = await axios.post('/api/bunch/create', body, config);

        // create a bunch
        dispatch({
            type: CREATE_BUNCH,
            payload: response.data
        });

        // load that bunch
        dispatch(loadUserAction())
        dispatch(loadBunchAction());
        dispatch(setAlert('Bunch  created', 'success'));
    } catch (error) {
        dispatch(setAlert(error.msg, 'danger'));
        dispatch({ type: BUNCH_ERROR });
    }
}

export const joinBunchAction = ({ bunchId, secret }) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const body = JSON.stringify({ bunchId, secret });
        const response = await axios.post('/api/bunch/join', body, config);

        // create a bunch
        dispatch({
            type: CREATE_BUNCH,
            payload: response.data
        });

        // load that bunch
        dispatch(loadUserAction())
        dispatch(loadBunchAction());
        dispatch(setAlert('Bunch  Joined', 'success'));
    } catch (error) {
        dispatch(setAlert(error.response.data.errors[0].msg, 'danger'));
        // dispatch({ type: BUNCH_ERROR });
    }
}

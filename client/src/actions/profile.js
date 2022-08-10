import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_PROFILES, GET_REPOS } from "./types";
import setAuthHeader from "../utils/setAuthHeader";

export const getCurrentProfileAction = () => async dispatch => {
    try {
        console.log("hello world");
        const response = await axios.get("/api/profile/me");
        console.log(response);
        dispatch(
            {
                type: GET_PROFILE,
                payload: response.data
            }
        )
    } catch (error) {
        dispatch(
            {
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }
        )
    }
};

export const getProfileByIdAction = (userid) => async dispatch => {
    // get profile of a user using his id
    // We fill it in the profile object
    // and display it.
    // How ever there wont be add experience and all these buttons
    try {
        const response = await axios.get(`/api/profile/${userid}`);
        console.log(response);
        dispatch(
            {
                type: GET_PROFILE,
                payload: response.data
            }
        )
    } catch (error) {
        console.log(error);
        dispatch(
            {
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.data.msg,
                    status: error.response.status
                }
            }
        )
    }
};



export const getGithubReposAction = (username) => async dispatch => {
    // Get Github repos
    // dispatch({ type: CLEAR_PROFILE });
    try {
        const response = await axios.get(`/api/profile/github/${username}`);

        dispatch(
            {
                type: GET_REPOS,
                payload: response.data
            }
        )
    } catch (error) {
        dispatch(
            {
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }
        )
    }
};

export const getAllProfilesAction = () => async dispatch => {
    // Get all profiles
    dispatch({ type: CLEAR_PROFILE });
    try {
        const response = await axios.get("/api/profile");

        dispatch(
            {
                type: GET_PROFILES,
                payload: response.data
            }
        )
    } catch (error) {
        dispatch(
            {
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }
        )
    }
}

export const createProfile = (formData, edit = false, navigate) => async dispatch => {
    setAuthHeader(localStorage.token);
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify(formData);
        const response = await axios.post('/api/profile', body, config);
        console.log("response", response);
        dispatch(
            {
                type: GET_PROFILE,
                payload: response.data
            }
        )

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile created', 'success'));

        if (!edit) {
            // if the profile is newly created then redirect to dashboard
            navigate('/dashboard');
        }
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;
        errors.map((error) => dispatch(setAlert(error.msg, 'danger')));
        dispatch(
            {
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }
        )
    }
};

// Add experience
export const addExperienceAction = (formData, navigate) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify(formData);
        const response = await axios.put('/api/profile/experience', body, config);
        dispatch(
            {
                type: UPDATE_PROFILE,
                payload: response.data
            }
        )

        dispatch(setAlert('Experience added', 'success'));

        // if the profile is newly created then redirect to dashboard
        navigate('/dashboard');
    } catch (error) {
        let errors;
        if (error.response) {
            errors = error.response.data.errors;
            errors.map((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch(
            {
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            }
        )
    }
}


// Add education
export const addEducationAction = (formData, navigate) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify(formData);
        const response = await axios.put('/api/profile/education', body, config);
        dispatch(
            {
                type: UPDATE_PROFILE,
                payload: response.data
            }
        )

        dispatch(setAlert('Education added', 'success'));

        // if the profile is newly created then redirect to dashboard
        navigate('/dashboard');
    } catch (error) {
        let errors;
        if (error.response) {
            errors = error.response.data.errors;
            errors.map((error) => dispatch(setAlert(error.msg, 'danger')));
            dispatch(
                {
                    type: PROFILE_ERROR,
                    payload: {
                        msg: error.response.statusText,
                        status: error.response.status
                    }
                }
            )
        }
    }
};

// delete Experience
export const deleteExperienceAction = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience deleted', 'success'));
    } catch (error) {
        if (error.response) {
            dispatch(
                {
                    type: PROFILE_ERROR,
                    payload: {
                        msg: error.response.statusText,
                        status: error.response.status
                    }
                }
            )
        }
    }
}

// delete Education
export const deleteEducationAction = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education deleted', 'success'));
    } catch (error) {
        if (error.response) {
            dispatch(
                {
                    type: PROFILE_ERROR,
                    payload: {
                        msg: error.response.statusText,
                        status: error.response.status
                    }
                }
            )
        }
    }
}

// delete account and profile
export const deleteAccountAndProfileAction = () => async dispatch => {
    if (window.confirm('Are you sure? This cannot be undone')) {
        try {
            await axios.delete(`/api/profile`);

            dispatch({
                type: CLEAR_PROFILE,
            });
            dispatch({
                type: ACCOUNT_DELETED,
            });

            dispatch(setAlert('Your account has been permanently deleted'));
        } catch (error) {
            if (error.response) {
                dispatch(
                    {
                        type: PROFILE_ERROR,
                        payload: {
                            msg: error.response.statusText,
                            status: error.response.status
                        }
                    }
                )
            }
        }
    }
}   
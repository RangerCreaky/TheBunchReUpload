import axios from 'axios';

const setAuthHeader = token => {
    // if there is a token then set it in the header
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    }
    else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthHeader;
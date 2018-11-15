import setAuthToken from '../utils/setAuthToken';

export function setCurrentUser(user) {
    return {
        type: "SET_CURRENT_USER",
        user
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    }
}
import {
    USERS_HAS_ERROR,
    USERS_IS_LOADING,
    USERS_FETCH_DATA_SUCCESS,
    USER_HAS_BEEN_DELETED,
    USER_HAS_BEEN_UPDATED
} from "./types";

import axios from 'axios';

export function usersHasError(bool) {
    return {
        type: USERS_HAS_ERROR,
        hasError: bool
    };
}

export function usersIsLoading(bool) {
    return {
        type: USERS_IS_LOADING,
        hasError: bool
    };
}

export function usersFetchDataSuccess(users) {
    return {
        type: USERS_FETCH_DATA_SUCCESS,
        users
    };
}

export function userHasBeenDeleted(bool) {
    return {
        type: USER_HAS_BEEN_DELETED,
        hasDeleted: bool
    };
}

export function userHasBeenUpdated(bool) {
    return {
        type: USER_HAS_BEEN_UPDATED,
        hasUpdated: bool
    };
}

export function userCreate(user) {
    user = {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        password: user.password,
        domain: user.domain,
        role: user.role,
        avatar: "public/avatars/avatar.jpg",
    };
    console.log("user: %s", JSON.stringify(user));
    return dispatch => {
        axios.post('/api/users', user, {
            headers: {authorization: localStorage.getItem('jwtToken')}
        })
            .then((response) => response.json())
            .then((users) => dispatch(usersFetchDataSuccess(users)))
            .catch((error) => {
                console.log(error);
                //dispatch(usersHasError(true))
            })
    }
}


/*
//TODO: FIX ROUTES. Create const
*/
export function deleteUser(id) {
    return (dispatch) => {
        axios.delete(`/api/users/${id}`, {
            data: {id: `${id}`},
            headers: {authorization: localStorage.getItem('jwtToken')}
        })
            .then((response) => {
                console.log("DELETE action: %s, %s", id, JSON.stringify(response.data));
                dispatch(userHasBeenDeleted(true));
                dispatch(usersFetchData());
            })
            .catch(() => dispatch(usersHasError(true)))
    }
}

/*
//TODO: FIX ROUTES. Create const
*/
export function updateUser(user) {
    console.log(user);
    return (dispatch) => {
        axios.put(`/api/users/${user.id}`, {
            id: `${user.id}`,
            name: `${user.name}`,
            email: `${user.email}`,
            password: `${user.password}`,
            domain: `${user.domain}`,
            avatar: `public/avatars/${user.avatar}`,
        }, {headers: {authorization: localStorage.getItem('jwtToken')}})
            .then((response) => {
                console.log("UPDATE action: %s, %s", user.id, JSON.stringify(response.data));
                dispatch(userHasBeenUpdated(true))
                dispatch(usersFetchData())
            })
            .catch((error) => {
                console.log(error);
                dispatch(usersHasError(true));

            });
    }
}

export function usersFetchData() {
    return (dispatch) => {
        dispatch(usersIsLoading(true));

        axios.get('/api/users')
            .then((response) => dispatch(usersFetchDataSuccess(response.data)))
            .catch((error) => dispatch(usersHasError(true)));
    }
}


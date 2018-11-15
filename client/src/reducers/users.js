import {
    USERS_HAS_ERROR,
    USERS_IS_LOADING,
    USERS_FETCH_DATA_SUCCESS,
    USER_HAS_BEEN_DELETED,
    USER_HAS_BEEN_UPDATED
} from "../actions/types";

export function usersHasError(state = false, action) {
    switch (action.type) {
        case USERS_HAS_ERROR:
            return action.hasError;

        default:
            return state;
    }
}

export function usersIsLoading(state = false, action) {
    switch (action.type) {
        case USERS_IS_LOADING:
            return action.isLoading = true;

        default:
            return state;
    }
}

export function userDelete(state = false, action) {
    switch (action.type) {
        case USER_HAS_BEEN_DELETED:
            return action.users = true;
        default:
            return state;
    }
}

export function userUpdate(state = false, action) {
    switch (action.type) {
        case USER_HAS_BEEN_UPDATED:
            return action.users = true;
        default:
            return state;
    }
}

export function users(state = [], action) {
    switch (action.type) {
        case USERS_FETCH_DATA_SUCCESS:
            return action.users;

        default:
            return state;
    }
}


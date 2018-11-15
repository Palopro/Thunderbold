import {combineReducers} from 'redux';
import {
    users,
    usersHasError,
    usersIsLoading,
    userDelete,
    userUpdate
} from './users';
import auth from './auth';

export default combineReducers({
    users,
    usersHasError,
    usersIsLoading,
    userDelete,
    userUpdate,
    auth,
});
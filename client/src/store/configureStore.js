import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

    return createStore(
        rootReducer,
        initialState,
        //applyMiddleware(thunk),
        composeWithDevTools(
            applyMiddleware(thunk),
        )
    );
}
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import {Provider} from 'react-redux';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import registerServiceWorker from './registerServiceWorker';
import App from "./App";
import List from "./components/List/List";
import jwtDecode from 'jwt-decode';
import configureStore from './store/configureStore';
import {setCurrentUser} from "./actions/auth";

const store = configureStore();


if (localStorage.jwtToken) {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact strict component={App}/>
                <Route path="/list" exact strict component={List}/>
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';
import 'antd/dist/antd.css';

// self
import RootRouter from './router/index';
import rootReducer from './content/reducer/index'
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

// init auth situation, if token exists, set auth.logged = true
const checkAuth = () => {
    const token = localStorage.getItem('token')
    const level = localStorage.getItem('level')
    const username = localStorage.getItem('username')
    if( token && level && username ) {
        store.dispatch({
            type: 'LOGIN',
            token: token,
            level: level,
            username: username
        })
    }
}

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
      )
);
checkAuth();


ReactDOM.render(
<Provider store={store}>
    <RootRouter />
</Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

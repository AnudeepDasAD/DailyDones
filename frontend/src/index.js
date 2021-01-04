import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import {Router, Route, browserHistory} from "react-router";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './stores/reducers/rootReducer'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

//Need to pass a reducer into the redux store
//A combined reducer of two other reducers is being used in order to
//  simplify tasks
//  Thunk is middleware to the store
const store = createStore(rootReducer, applyMiddleware(thunk));

//Add a route for the default page, and also 
//  put an IndexRoute for the default- need to IMPORT from react-router
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

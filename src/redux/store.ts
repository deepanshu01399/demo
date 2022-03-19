import React from 'react';
import { combineReducers, createStore ,applyMiddleware} from 'redux';
import commonReducer from './reducers/commonReducer';
import thunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const combineReducer = combineReducers({
	commonReducer
});

//export const store = createStore(combineReducer,composedEnhancer)
//we need to insert a Middleware in between which would help to handle async operations.
export const store = createStore(combineReducer, applyMiddleware(thunk));

/**
 * reducer合成
 */
import { combineReducers } from 'redux';
import XhttpReducers from './xhttp/';
import bookPageState from './book/';

const AppReducers = combineReducers(Object.assign({}, XhttpReducers, {
	bookPageState
}));

export default AppReducers;

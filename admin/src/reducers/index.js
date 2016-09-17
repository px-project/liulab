/**
 * reducer合成
 */
import { combineReducers } from 'redux';
import XhttpReducers from './xhttp/';
import bookPageState from './book/';
import EntityReducer from './entity/';

const AppReducers = combineReducers(Object.assign({}, XhttpReducers, {
	entities: EntityReducer,
	bookPageState
}));

export default AppReducers;

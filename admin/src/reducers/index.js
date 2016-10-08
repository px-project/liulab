/**
 * reducer合成
 */
import { combineReducers } from 'redux';
import XhttpReducers from './xhttp/';
import BookReducers from './book/';
import EntityReducer from './entity/';

const AppReducers = combineReducers(Object.assign({}, XhttpReducers, {
	entities: EntityReducer,
	bookPageState: BookReducers
}));

export default AppReducers;

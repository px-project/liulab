/**
 * reducer合成
 */
import { combineReducers } from 'redux';
import XhttpReducers from './xhttp/';
import BookReducers from './book/';
import EntityReducer from './entity/';
import ProductReducers from './product/index.js';

const AppReducers = combineReducers(Object.assign({}, XhttpReducers, {
	entities: EntityReducer,
	bookPageState: BookReducers,
	productPageState: ProductReducers
}));

export default AppReducers;

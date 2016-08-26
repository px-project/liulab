/**
 * reducer合成
 */
import { combineReducers } from 'redux';
import XhttpReducers from './xhttp/';

const AppReducers = combineReducers(Object.assign({}, XhttpReducers, {

}));

export default AppReducers;

/**
 * reducer合成
 */
import { combineReducers } from 'redux';
import XhttpReducers from './xhttp/';
import EntityReducer from './entity/';
import XformReducer from './xform/';
import * as reducers from './reducers';
import api from '../config/api.json';
import xhttp from './xhttp/';

const _ = require('lodash');

export default combineReducers(Object.assign(
	{
		xform: XformReducer,
		entities: EntityReducer
	},
	...Object.keys(api).map(key => ({ [key]: combineReducers(xhttp[key]) })),
	...Object.keys(reducers).map(key => ({ [key]: reducers[key] }))
));
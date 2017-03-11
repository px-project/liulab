/**
 * reducer合成
 */
import { combineReducers } from 'redux';
import { EntityReducer } from './entity';
import XformReducer from './xform/';
import * as reducers from './reducers';
import api from '../config/api.json';
// import { XhttpReducers } from './xhttp/';
import * as _ from 'lodash';

export default combineReducers(Object.assign(
	{
		formData: XformReducer,
		entities: EntityReducer
	},
	// ...Object.keys(api).map(key => ({ [key]: combineReducers(XhttpReducers[key]) })),
	...Object.keys(reducers).map(key => ({ [key]: reducers[key] }))
));
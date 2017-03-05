/**
 * xhttp reducer total
 */
import { XhttpItemReducer } from './items';
import { XhttpFetchReducer } from './fetch';
import { XhttpConditionsReducer } from './conditions';
import { XhttpDetailReducer } from './detail';
import { combineReducers } from 'redux';

export const XhttpReducer = api => combineReducers({
    items: XhttpItemReducer(api),
    fetching: XhttpFetchReducer(api),
    conditions: XhttpConditionsReducer(api),
    detail: XhttpDetailReducer(api)
});

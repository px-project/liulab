/**
 * 产品reducers
 */

import { combineReducers } from 'redux';
import * as consts from '../../constants/';

export function productList(state = [], action) {
    switch (action.type) {
        case consts.RECEIVE_PRODUCT_LIST:
            return [
				...state,
				...action.result.map((item) => {
                    return Object.assign({}, item);
                })
        	];
        default:
            return state;
    }
}
/**
 * 产品reducers
 */

import { combineReducers } from 'redux';
// import * as productConsts from '../../constants/product';

export function productList(state = [], action) {
    switch (action.type) {
        default: console.log(action);
        return state;
    }
}

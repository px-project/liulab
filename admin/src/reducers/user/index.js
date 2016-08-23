/**
 * 用户reducers
 */

import { combineReducers } from 'redux';
import * as consts from '../../constants/';

export function userList(state = [], action) {
    switch (action.type) {
        case consts.RECEIVE_USER_LIST:
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


export function userDetail(state = {}, action) {
    return state;
}
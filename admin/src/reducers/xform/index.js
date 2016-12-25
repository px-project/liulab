/**
 * 表单变动reducer
 */
import * as consts from '../../constants/';
import { combineReducers } from 'redux';
const _ = require('lodash');

export default function XformReducer (state = {}, action) {
    switch (action.type) {
        case consts.FORM_CHANGE:
            let locals = action.field.split('.');
            getRef(state, locals.slice(0, -1))[locals.slice(-1)] = action.value;
            
            return _.cloneDeepWith(state);
        
        case consts.FORM_INIT:
            return _.cloneDeepWith(action.data);

        default:
            return state;
    }
}


function getRef (target, locals) {
    return locals.length ? getRef(target[locals[0]], locals.slice(1)) : target;
}

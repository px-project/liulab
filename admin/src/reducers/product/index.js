/**
 * 产品界面reducer
 */
import { SELECT_TEMPLATE_ID } from '../../constants/';
import { XhttpReducers } from '../xhttp';
import { combineReducers } from 'redux';
import * as _ from 'lodash';

function selectTemplateId(state = '', action) {
    let {type, template_id} = action;

    if (type === SELECT_TEMPLATE_ID) return template_id;

    return state;
}

export const ProductReducers = combineReducers(Object.assign({}, XhttpReducers.product, {
    selected: selectTemplateId
}));
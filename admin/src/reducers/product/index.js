/**
 * 产品界面reducer
 */
import * as consts from '../../constants/';
import xhttp from '../xhttp/';
import { combineReducers } from 'redux';
const _ = require('lodash');


function selectTemplateId(state = '', actions) {
    switch (actions.type) {
        case consts.SELECT_TEMPLATE_ID:
            return actions.template_id;

        default:
            return state;
    }
}

export const ProductReducers = combineReducers(Object.assign({}, xhttp.product, {
    selected: selectTemplateId
}));
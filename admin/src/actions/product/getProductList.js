/**
 * 请求角色列表数据
 */
import fetch from 'isomorphic-fetch';
import {GETTING_PRODUCT_LIST, RECEIVE_PRODUCT_LIST} from '../../constants/';
import apiConfig from '../../config/api.json';

function gettingProductList(condition) {
    return {
        type: GETTING_PRODUCT_LIST,
        condition
    };
}

function receiveProductList(condition, result) {
    return {
        type: RECEIVE_PRODUCT_LIST,
        condition,
        result,
        receiveAt: Date.now()
    };
}

export function getProductList(condition = {}) {
    return function(dispatch) {

        dispatch(gettingProductList(condition));

        return fetch(apiConfig.server + apiConfig.product)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(receiveProductList(condition, json.result));
                } else {

                }
            });
    }
}

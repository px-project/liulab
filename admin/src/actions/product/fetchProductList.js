/**
 * 请求产品列表数据
 */
import fetch from 'isomorphic-fetch';
import { getProductList, receiveProductList } from './index';
import apiConfig from '../../config/api.json';

export function fetchProductList(condition) {
    return function(dispatch) {
        dispatch(getProductList(condition));

        return fetch(apiConfig.server + apiConfig.product)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    dispatch(receiveProductList(condition, json.result));
                } else {}
            });
    }
}

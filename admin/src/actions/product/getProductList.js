/**
 * 获取产品列表
 */

import * as consts from '../../constants/';
export function getProductList(condition) {
    return {
        type: consts.GET_PRODUCT_LIST,
        condition
    }
}

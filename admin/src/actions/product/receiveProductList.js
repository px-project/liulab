/**
 * 获取到产品列表
 */
import * as consts from '../../constants/';

export function receiveProductList(condition, result) {
    return {
        type: consts.RECEIVE_PRODUCT_LIST,
        condition,
        result,
        receiveAt: Date.now()
    }
}

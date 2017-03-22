/**
 * 选购
 */
import { BOOK_PRODUCT_ADD } from '../constants';
import { cloneDeepWith } from 'lodash';

export function BookProductAddReducer(state = {}, action) {
    let { type, category_id } = action;
    let result = cloneDeepWith(state);
    if (type === BOOK_PRODUCT_ADD) result[category_id] = result[category_id] ? (result[category_id] + 1) : 1;
    return result;
}
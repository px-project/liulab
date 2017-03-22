/**
 * 选购
 */
import { BOOK_PRODUCT_ADD } from '../constants';

function BookProductAddAction(product_id) {
    return {
        type: BOOK_PRODUCT_ADD,
        product_id
    };
}

export function BookProductAdd(product_id) {
    return dispatch => dispatch(BookProductAddAction(product_id));
}
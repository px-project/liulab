/**
 * select product reducer.
 */
import { PRODUCT_SELECT } from '../../constants';
import { cloneDeepWith } from 'lodash';

export const ProductSelectReducer = (state = [], actions) => {
    let { type, product_id } = actions;

    let newState = cloneDeepWith(state);

    if (type === PRODUCT_SELECT) {
        let index = newState.indexOf(product_id);
        if (index >= 0) newState.splice(index, 1);
        else newState.push(product_id);
    }

    return newState;
};
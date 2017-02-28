/**
 * 品类操作
 */
import { CREATE_CATEGORY, UPDATE_CATEGORY } from '../constants';

function createCategoryAction(newData) {
    return {
        type: CREATE_CATEGORY,
        newData
    };
}

function updateCategoryAction(category_id, newData) {
    return {
        type: UPDATE_CATEGORY,
        category_id,
        newData
    };
}

export function createCategory(newData) {
    return dispatch => dispatch(createCategoryAction(newData));
}

export function updateCategory(category_id, newData) {
    return dispatch => dispatch(updateCategoryAction(category_id, newData));
}
/**
 * 批量上传action.
 */
import { BOOK_UPLOAD_CATEGORY_SELECT, BOOK_UPLOAD_STEP, BOOK_UPLOAD_STEPS } from '../constants';

function uploadChangeStepAction(step) {
    return {
        type: BOOK_UPLOAD_STEP,
        step
    };
}

function uploadCategorySelectAction(category_id) {
    return {
        type: BOOK_UPLOAD_CATEGORY_SELECT,
        category_id
    }
}

export function uploadChangeStep(step) {
    return dispatch => dispatch(uploadChangeStepAction(step));
}

export function uploadCategorySelect(category_id) {
    return dispatch => dispatch(uploadCategorySelectAction(category_id));
}
/**
 * 上传界面reducer
 */
import { BOOK_UPLOAD_STEP, BOOK_UPLOAD_STEPS, BOOK_UPLOAD_CATEGORY_SELECT } from '../constants';

export function UploadStepReducer(state = BOOK_UPLOAD_STEPS[0].status, action) {
    if (action.type === BOOK_UPLOAD_STEP) return action.step;
    return state;
}

export function UploadCategoryReducer(state = [], action) {
    if (action.type === BOOK_UPLOAD_CATEGORY_SELECT) {
        let index = state.indexOf(action.category_id);
        if (index >= 0) return state.filter(category_id => category_id !== action.category_id);
        return state.concat(action.category_id);
    }
    return state;
}
/**
 * 表单绑定action
 */
import * as consts from '../../constants/';

function formChangeAction(field, value) {
    return {
        type: consts.FORM_CHANGE,
        field,
        value
    };
}

function formInitAction(data) {
    return {
        type: consts.FORM_INIT,
        data
    };
}

export function xform(value, field) {
    if (field) {
        return (dispatch) => {
            dispatch(formChangeAction(field, value));
        };
    } else {
        return (dispatch) => {
            dispatch(formInitAction(value));
        };
    }

}
/**
 * 表单绑定action
 */
import * as consts from '../../constants/';


function xformInitAction(data) {
    return {
        type: consts.XFORM_INIT,
        data
    };
}

function xformChangeAction(field, value) {
    return {
        type: consts.XFORM_CHANGE,
        field,
        value
    };
}

function xformClear() {
    return {
        type: consts.XFORM_CLEAR
    };
}

/**
 * 初始化
 */
function xformInit(data) {
    return dispatch => {
        dispatch(xformInitAction(data));
    };
}

/**
 * 字段变动
 */
function xformChange(field, e) {
    let el = e.target, value;

    // radio
    // if (el.checked !== undefined) value = el.checked;

    // input textarea
    // else value = el.value;
    value = el.value;

    return dispatch => {
        dispatch(xformChangeAction(field, value));
    }
}

/**
 * 清楚表单数据
 */
function xformClear() {
    return dispatch(xformClear());
}

export const xform = {
    init: xformInit,
    change: xformChange,
    clear: xformClear
};
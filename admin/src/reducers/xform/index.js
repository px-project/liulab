/**
 * 表单变动reducer
 */
import * as consts from '../../constants/';
import { combineReducers } from 'redux';
import * as _ from 'lodash';

export default function XformReducer(state = {}, action) {
    switch (action.type) {

        // 表单数据初始化
        case consts.XFORM_INIT:
            return _.cloneDeepWith(action.data);

        // 表单字段变化
        case consts.XFORM_CHANGE:
            let fields = action.field.split('.');
            getRef(state, fields.slice(0, -1))[fields.slice(-1)] = action.value;
            return _.cloneDeepWith(state);

        // 清空表单数据
        case consts.XFORM_CLEAR:
            return {};

        default:
            return state;
    }
}

// 获取深层引用
function getRef(target, locals) {
    return locals.length ? getRef(target[locals[0]], locals.slice(1)) : target;
}

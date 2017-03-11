/**
 * 品类操作
 */
import { CATEGORY_ADD_ATTR, CATEGORY_EDIT_ATTR, CATEGORY_DELETE_ATTR, CATEGORY_SAVE_ATTR } from '../constants';

function categoryAddAttrAction() {
    return {
        type: CATEGORY_ADD_ATTR
    };
}

function categoryEditAttrAction(index) {
    return {
        type: CATEGORY_EDIT_ATTR,
        index
    };
}

function categoryDeleteAttrAction(index) {
    return {
        type: CATEGORY_DELETE_ATTR,
        index
    }
}

function categorySaveAttrAction(index, newData) {
    return {
        type: CATEGORY_SAVE_ATTR,
        index,
        newData
    };
}

// 添加属性
export const categoryAddAttr = () => dispatch => dispatch(categoryAddAttrAction());

// 编辑属性
export const categoryEditAttr = index => dispatch => dispatch(categoryEditAttrAction(index));

// 移除属性
export const categoryDeleteAttr = index => dispatch => dispatch(categoryDeleteAttrAction(index));

// 保存属性
export const categorySaveAttr = (index, newData) => dispatch => dispatch(categorySaveAttrAction(index, newData));
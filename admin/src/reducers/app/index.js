/**
 * 顶级容器reducer
 */
import * as consts from '../../constants/';
import { combineReducers } from 'redux';

function appShowSidebarReducer(state = true, action) {
    if (action.type === consts.APP_SIDEBAR_SHOW) return typeof action.show === 'boolean' ? action.show : !state;
    return state;
}

function appShowShopReducer(state = false, action) {
    if (action.type === consts.APP_SHOP_SHOW) return typeof action.show === 'boolean' ? action.show : !state;
    return state;
}

export const AppContainerReducers = combineReducers({
    sidebar: appShowShopReducer,
    shop: appShowShopReducer
});
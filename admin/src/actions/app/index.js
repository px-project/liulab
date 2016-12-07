/**
 * 顶级容器actions
 */
import * as consts from '../../constants/';

// 暂时购物车action
function appShopShowAction (show) {
    return {
        type: consts.APP_SHOP_SHOW,
        show
    };
}

// 展示侧边栏action生成
function appSidebarShowAction (show) {
    return {
        type: consts.APP_SIDEBAR_SHOW,
        show
    }
}

// 暂时购物车详情
export function appShopShow (show) {
    return (dispatch) => {
        dispatch(appShopShowAction(show));
    };
}

// 展示侧边栏
export function appSidebarShow (show) {
    return dispatch => {
        dispatch(appShopShowAction(show));
    }
}
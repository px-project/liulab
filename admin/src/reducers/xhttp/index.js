/**
 * xhttp reducers
 */
import * as consts from '../../constants/';
import apiConfig from '../../config/api.json';

let exportColl = {};

/**
 * 各接口生成封装
 */
for (let currentApi in apiConfig) {
    if (currentApi === 'server') continue;

    let stateKey = currentApi.split('-')[0];

    let initState = { items: [] };


    let reducer = (state = initState, action) => {

        if (!action.options) return state;

        // 新状态初始化
        let newState = null;
        if (action.options.reload) {
            // 重新加载
            newState = Object.assign({}, initState);
        } else {
            // 不覆盖
            newState = Object.assign({}, state);
        }

        if (action.type === consts.XHTTP_RECEIVE && action.options.api === currentApi) {

            switch (action.options.action) {

                case 'list':
                    // 获取列表

                    // 处理items
                    [...newState.items, ...action.result].map((item) => {
                        if (newState.items.indexOf(item) < 0) newState.items.push(item);
                    });


                    break;

                case 'detail':
                    // 获取详情
                    let hasitem = false;
                    for (let index in newState.items) {
                        if (newState.items[index]._id === action.result._id) {
                            newState.items[index] = action.result;
                            newState.detailIndex = index;
                            hasitem = true;
                        }
                    }
                    if (!hasitem) newState = { detailIndex: 0, items: [action.result] };
                    break;

                case 'create':
                    // 创建
                    newState.items.push(Object.assign({}, action.result));
                    break;

                case 'update':
                    // 更新
                    break;

                case 'delete':
                    // 删除
                    break;

                default:
                    console.error('param error: action is not one of [list, detail, create, update, delete]');
            }
        }
        return newState;
    }

    exportColl[currentApi] = reducer;
}

export default exportColl;

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
        let newState = Object.assign({}, state);

        if (action.type === consts.XHTTP_RECEIVE && action.api === currentApi) {

            switch (action.action) {
                case 'list':
                    // 获取列表
                    if (action.reload) {
                        // 刷新
                        newState = {
                            items: action.result.map((item) => Object.assign({}, item))
                        };
                    } else {
                        // item去重 todo
                        [...newState.items, ...action.result.items].map((item) => {
                            if (newState.items.indexOf(item) < 0) newState.items.push(item);
                        });
                    }
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

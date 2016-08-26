/**
 * xhttp reducers
 */
import * as consts from '../../constants/';
import apiConfig from '../../config/api.json';


let exportColl = {};

/**
 * 实体
 */
function entities(state = {}, action) {
    switch (action.type) {
        case consts.XHTTP_RECEIVE:
            if (action.reload) {
                return {
                    [action.api]: Object.assign({}, ...action.result.map((item) => {
                        return {[item._id]: item};
                    })) 
                };
            } else {
                let newState = Object.assign({}, state);
                switch (action.action) {
                    case 'list':
                        newState[action.api] = Object.assign(
                            {}, newState[action.api],
                            ...action.result.map((item) => {
                                return { [item._id]: item };
                            })
                        );
                        break;
                    
                    case 'detail':
                        // todo
                        break;

                    case 'create':
                        // todo
                        break;

                    case 'update':
                        // todo
                        break;

                    case 'delete':
                        // todo
                        break;
                    
                    default:
                        console.error('param error: action is not one of [list, detail, create, update, delete]');
                }
                return newState;
            }
        default:
            return state;
    }

}

exportColl.entities = entities;

/**
 * 各接口生成封装
 */
for (let currentApi in apiConfig) {
    if (currentApi === 'server') continue;

    let reducer = (state = { items: [] }, action) => {

        if (action.type === consts.XHTTP_RECEIVE && action.api === currentApi) {
            state = Object.assign({}, state);

            switch (action.action) {
                case 'list':
                    if (action.reload) {
                        state = {
                            items: action.result.map((item) => item._id)
                        };
                    } else {
                        // item去重
                        [...state.items, ...action.result.items].map((item) => {
                            if (state.items.indexOf(item) < 0) state.items.push(item);
                        });
                    }
                    break;

                case 'detail':
                    // todo
                    break;

                case 'create':
                    // todo
                    break;

                case 'update':
                    // todo
                    break;

                case 'delete':
                    // todo
                    break;

                default:
                    console.error('param error: action is not one of [list, detail, create, update, delete]');
            }
        }
        return state;
    }

    exportColl[currentApi] = reducer;
}

export default exportColl;

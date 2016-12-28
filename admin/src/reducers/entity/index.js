/**
 * 实体reducer
 */
import * as consts from '../../constants/xhttp';

export default function EntityReducer(state = {}, action) {
    if (action.type === consts.XHTTP_RECEIVE) {

        if (!action.options) return state;

        let newState = Object.assign({}, state);

        switch (action.options.method) {
            case 'list':
                newState = Object.assign(newState, ...action.result.map((item, index) => {
                    return { [item._id]: item };
                }));
                break;

            case 'detail':
            case 'create':
            case 'update':
                newState = Object.assign(newState, {
                    [action.result._id]: action.result
                });
                break;

            case 'delete':
                delete newState[action.result._id];
                break;

            default:
                console.error('param error: action is not one of [list, detail, create, update, delete]');
        }

        state = newState;
    }

    return state;
}

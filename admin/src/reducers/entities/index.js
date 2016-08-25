/**
 * 实体reducers
 */
import * as consts from '../../constants/';
export function entities(state = {}, action) {
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

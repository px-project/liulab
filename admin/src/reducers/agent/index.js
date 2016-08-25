/**
 * 代理商reducers
 */
import * as consts from '../../constants/';
export function agent(state = {}, action) {
    switch (action.type) {
        case consts.XHTTP_RECEIVE:
            return state;
        default:
            return state;
    }

}

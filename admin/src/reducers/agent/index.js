/**
 * 代理商reducers
 */
import * as consts from '../../constants/';
export function agentList(state = [], action) {
    switch (action.type) {
        case consts.RECEIVE_AGENT_LIST:
            return [
				...state,
				...action.result.map((item) => {
                    return Object.assign({}, item);
                })
			];
        default:
            return state;
    }

}

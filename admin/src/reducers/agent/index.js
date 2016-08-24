/**
 * 代理商reducers
 */
import {RECEIVE_AGENT_LIST} from '../../constants/';
export function agentList(state = [], action) {
    switch (action.type) {
        case RECEIVE_AGENT_LIST:
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

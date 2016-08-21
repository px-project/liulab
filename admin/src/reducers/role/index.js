/**
 * 角色reducers
 */
import * as roleConsts from '../../constants/role';

export function roleList(state = [], action) {
    switch (action.type) {
        case roleConsts.RECEIVE_ROLE_LIST:
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

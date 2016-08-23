/**
 * 获取到代理列表
 */
import { RECEIVE_AGENT_LIST } from '../../constants/agent';

export function receiveAgentList(condition, result) {
    return {
        type: RECEIVE_AGENT_LIST,
        condition,
        result,
        receiveAt: Date.now()
    }
}

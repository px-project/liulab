/**
 * 获取代理数据
 */
import { GET_AGENT_LIST } from '../../constants/agent';

export function getAgentList(condition) {
    return {
        type: GET_AGENT_LIST,
        condition
    }
}

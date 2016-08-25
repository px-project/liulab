/**
 * reducer合成
 */
import { combineReducers } from 'redux';
import { userList } from './user/';
import { productList } from './product/';
import { roleList } from './role/';
import { agentList } from './agent/';
import {entities} from './entities';
const AppReducers = combineReducers({
    userList,
    productList,
    roleList,
    agentList,
    entities
});

export default AppReducers;

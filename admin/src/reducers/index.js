/**
 * reducer合成
 */
import { combineReducers } from 'redux';
import { userList } from './user/';
import { productList } from './product/';
import { roleList } from './role/';
import { agentList } from './agent/';

const AppReducers = combineReducers({
    userList,
    productList,
    roleList,
    agentList
});

export default AppReducers;

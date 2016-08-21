/**
 * reducer合成
 */
import { combineReducers } from 'redux';
import { userList } from './user/';
import { productList } from './product/';
import { roleList } from './role/';


const AppReducers = combineReducers({
    userList,
    productList,
    roleList
});

export default AppReducers;

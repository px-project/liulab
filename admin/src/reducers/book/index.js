/**
 * 订购界面reducer
 */
import * as consts from '../../constants/';
import * as _ from 'lodash';
import { combineReducers } from 'redux';

// 页面状态
function bookStatusReducer(state = 'select', action) {
	if (action.type === consts.BOOK_STATUS) return action.state;
	return state;
}

// 选择品类
function bookCategoryReducer(state = {}, action) {

	let newState = _.cloneDeepWith(state);

	if (action.type === consts.BOOK_CATEGORY_TOGGLE) {
		newState[action.category_id] = !newState[action.category_id];
		return newState;
	}

	return newState;
}

// 选择产品
function bookProductReducer(state = {}, action) {

	let newState = _.cloneDeepWith(state);
	let {type, product_id, num} = action;

	// 添加产品
	if (type === consts.BOOK_PRODUCT_ADD) {
		newState[product_id] = newState[product_id] || 0;
		newState[product_id]++;
	}

	// 改变产品数量
	if (type === consts.BOOK_PRODUCT_CHANGE) {
		if (num < 0) newState[product_id] += num;
		else newState[product_id] = num;
		if (newState[product_id] <= 0) delete newState[product_id];
	}

	return newState;

}

export const BookReducers = combineReducers({
	state: bookStatusReducer,
	selectCategory: bookCategoryReducer,
	selectProduct: bookProductReducer
});
/**
 * 订购界面reducer
 */
import * as consts from '../../constants/';
import { combineReducers } from 'redux';

function bookReducer(state = 'select', action) {
	switch (action.type) {
		case consts.BOOK_PAGE_STATE:
			return action.newState;

		default:
			return state;
	}
}

function selectCategoryReducer(state = {}, action) {
	switch (action.type) {
		case consts.BOOK_SELECT_CATEGORY:

			let newState = Object.assign({}, state);
			newState[action.category_id] = !newState[action.category_id];
			return newState;

		default:
			return state;
	}
}

function selectProductIdReducer(state = '', action) {
	switch (action.type) {
		case consts.BOOK_SELECT_ID:
			return action.id;

		default:
			return state;
	}
}

function addProductReducer(state = {}, action) {
	switch (action.type) {
		case consts.BOOK_ADD_PRODUCT:
			return Object.assign({}, state, {
				[action.product_id]: (state[action.product_id] || 0) + parseInt(action.num)
			});

		default:
			return state;
	}
}



export const BookReducers = combineReducers({
	pageState: bookReducer,
	selectCategory: selectCategoryReducer,
	template_id: selectProductIdReducer,
	productList: addProductReducer
});
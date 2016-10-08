/**
 * 订购界面reducer
 */
import * as consts from '../../constants/';
import {combineReducers} from 'redux';

function bookPageStateReducer (state = 'select', action) {
	switch (action.type) {
		case consts.BOOK_PAGE_STATE:
			return action.newState;

		default:
			return state;
	}
}

function selectProductType (state = [], action) {
	switch (action.type) {
		case consts.BOOK_SELECT_INDEX:
			let {index = -1, len = 0} = action;
			let newState = [];

			// init newState
			if (state.length === len) {
				newState = state.slice(0);
			} else {
				for (let i = 0; i < len; i++) newState.push(false);
			}

			newState[index] = !newState[index];

			if (index === -1) newState = [];
			return newState;

		default:
			return state;
	}
}


const BookReducers = combineReducers({
	pageState: bookPageStateReducer,
	productTypeIndex: selectProductType

});


export default BookReducers;

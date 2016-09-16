/**
 * 订购界面action
 */
import * as consts from '../../constants/';

function bookState (newState) {
	return {
		type: consts.BOOK_CHANGE_STATE,
		newState
	}
}



export function changeBookState (newState) {
	return function (dispatch) {
		dispatch(bookState(newState));
	}
}

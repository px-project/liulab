/**
 * 订购界面reducer
 */
import * as consts from '../../constants/';

export default function bookPageState (state = 'upload', action) {
	switch (action.type) {
		case consts.BOOK_CHANGE_STATE:
			return action.newState;

		default:
			return state;
	}
}

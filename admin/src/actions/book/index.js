/**
 * 订购界面action
 */
import * as consts from '../../constants/';

// 生成状态
function genBookState (newState) {
	return {
		type: consts.BOOK_PAGE_STATE,
		newState
	};
}


// 选择对应产品类型
function selectType (index, len) {
	return {
		type: consts.BOOK_SELECT_INDEX,
		index,
		len
	};
}


// 选择产品模式下选择模板id
function selectTypeId (id) {
	return {
		type: consts.BOOK_SELECT_ID,
		id
	};
}

// 变动上传状态
export function changeBookState (newState) {
	return function (dispatch) {
		dispatch(genBookState(newState));
	};
}


// 选择对应产品类型
export function selectProductType (index, len) {
	return function (dispatch) {
		dispatch(selectType(index, len));
	};
}

// 选择id
export function selectProductId (id) {
	return function (dispatch) {
		dispatch(selectTypeId(id));
	};
}

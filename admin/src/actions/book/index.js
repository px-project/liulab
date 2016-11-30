/**
 * 订购界面action
 */
import * as consts from '../../constants/';

// 生成状态
function BookStateAction (newState) {
	return {
		type: consts.BOOK_PAGE_STATE,
		newState
	};
}


// 选择品类
function selectCategoryAction (category_id) {
	return {
		type: consts.BOOK_SELECT_CATEGORY,
		category_id
	};
}

// 选择产品
function addProductAction (product_id, num) {
	return {
		type: consts.BOOK_ADD_PRODUCT,
		product_id,
		num
	}
}


// 选择产品模式下选择模板id
function selectTypeIdAction (id) {
	return {
		type: consts.BOOK_SELECT_ID,
		id
	};
}

// 变动上传状态
export function changeBookState (newState) {
	return function (dispatch) {
		dispatch(BookStateAction(newState));
	};
}


// 选择品类
export function selectCategory (category_id) {
	return function (dispatch) {
		dispatch(selectCategoryAction(category_id));
	};
}

// 选择id
export function selectProductId (id) {
	return function (dispatch) {
		dispatch(selectTypeIdAction(id));
	};
}

// 添加产品
export function addProduct (product_id, num) {
	return function (dispatch) {
		dispatch(addProductAction(product_id, num));
	};
}

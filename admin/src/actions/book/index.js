/**
 * 订购界面action
 */
import * as consts from '../../constants/';

// 页面状态
function BookStateAction(state) {
	return {
		type: consts.BOOK_STATUS,
		state
	};
}

// 选择品类
function toggleCategoryAction(category_id) {
	return {
		type: consts.BOOK_CATEGORY_TOGGLE,
		category_id
	};
}

// 添加产品到购物车
function addProductAction(product_id) {
	return {
		type: consts.BOOK_PRODUCT_ADD,
		product_id
	};
}

// 改变购物车中产品数量
function changeProductAction(product_id, num) {
	return {
		type: consts.BOOK_PRODUCT_CHANGE,
		product_id,
		num
	};
}

// 变动上传状态
function changeState(state) {
	return dispatch => dispatch(BookStateAction(state));
}

// 选择品类
function toggleCategory(category_id) {
	return dispatch => dispatch(toggleCategoryAction(category_id));
}

// 添加产品到购物车
function addProduct(product_id) {
	return dispatch => dispatch(addProductAction(product_id));
}

// 改变购物车产品数量
function changeProduct(product_id, num) {
	return dispatch => dispatch(changeProductAction(product_id, num));
}

export const xbook = {
	changeState,
	toggleCategory,
	addProduct,
	changeProduct
};
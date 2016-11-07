/**
 * 选择产品预定
 */
import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router';
import { BookSelectConfirmComponent as Confirm } from '../confirm/';
import { BookSelectSelectComponent as Select } from '../select/';

export class BookComponent extends Component {
	componentWillMount() {
		let {xhttp, changeBookState} = this.props;

		changeBookState('select');

		this.getCategoryList(xhttp);
		this.getProductList(xhttp);
	}

	componentDidMount() {
	}


	render() {
		let {changeBookState, bookPageState, category, product, entities} = this.props;
		let status = bookPageState.pageState;

		return (
			<div className="book-index-page page">
				{!category.fetching && !product.fetching ? (
					<div className="book-index-index">
						<header className="header-menu">
							<div className="upload">
								<Link to={'/book/upload'} className="ui button primary">批量上传</Link>
							</div>
							<div className="category">
								<select className="ui selection dropdown" ref="dropdown" onChange={this.selectCategory.bind(this, this.props)}>
									<option value="">所有品类</option>
									{category.items.map((category_id, category_index) => (
										<option key={category_index} value={category_id}>{entities[category_id].name}</option>
									))}
								</select>
							</div>
							<div className="shop">
								<button className="ui button red">购物车</button>
							</div>
						</header>
						<div>
							{status === 'confirm' && <Confirm {...this.props}></Confirm>}
							{status === 'select' && <Select {...this.props}></Select>}
						</div>
					</div>
				) : ''}
			</div>
		);
	}

	// 选择品类
	selectCategory(props, e) {
		let category_id = e.target.value;
		let condition = {};
		if (category_id) condition.category_id = category_id;
		this.getProductList(props.xhttp, condition, () => { });
	}

	// 获取品类列表
	getCategoryList(xhttp, cb) {
		xhttp({ action: 'list', api: 'category' }, res => {
			if (res.success) cb(res.result);
		});
	}

	// 获取产品列表
	getProductList(xhttp, condition, cb) {
		console.log(111);
		xhttp({ action: 'list', api: 'product', condition }, res => {
			if (res.success) cb(res.result);
		});
	}
}

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
		this.props.changeBookState('select');

		this.getCategoryList();
		this.getProductList();
	}

	componentDidMount() {
	}


	render() {
		let {changeBookState, bookPageState, category, product, entities} = this.props;
		let {pageState, productList} = bookPageState;

		return (
			<div className="book-index-page page">
				{!category.fetching && !product.fetching ? (
					<div className="book-index-index">
						<header className="list-header">
							<div className="upload add">
								<Link to={'/book/upload'} className="ui button primary">批量上传</Link>
							</div>
							<div className="category group">
								<select className="ui selection dropdown" ref="dropdown" onChange={this.selectCategory.bind(this)}>
									<option value="">所有品类</option>
									{category.items.map((category_id, category_index) => (
										<option key={category_index} value={category_id}>{entities[category_id].name}</option>
									))}
								</select>
							</div>
							<div className="shop">
								<button className="ui button red" onClick={this.props.changeBookState.bind(this, 'confirm')}>
									<span>购物车</span>
									<span>({Object.keys(productList).reduce((a, b) => (a + productList[b]), 0)})</span>
								</button>
							</div>
						</header>
						<div>
							{pageState === 'confirm' && <Confirm {...this.props}></Confirm>}
							{pageState === 'select' && <Select {...this.props}></Select>}
						</div>
					</div>
				) : ''}
			</div>
		);
	}

	// 选择品类
	selectCategory(e) {
		let category_id = e.target.value;
		let condition = {};
		if (category_id) condition.category_id = category_id;
		this.getProductList(condition, () => { });
	}

	// 获取品类列表
	getCategoryList(cb) {
		this.props.xhttp({ action: 'list', api: 'category' }, res => {
			if (res.success) cb(res.result);
		});
	}

	// 获取产品列表
	getProductList(condition, cb) {
		this.props.xhttp({ action: 'list', api: 'product', condition }, res => {
			if (res.success) cb(res.result);
		});
	}
}
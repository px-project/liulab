/**
 * 选择产品预定
 */
import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router';
import classname from 'classname';
import defaultCategoryPhoto from '../../../public/images/default.png';

export class BookComponent extends Component {
	componentWillMount() {
		this.getCategoryList();
		this.getProductList();
	}

	componentDidUpdate() {
		$(this.refs.dropdown).dropdown();
	}

	// 变换界面状态
	changeCurrentPageState(props, status, e) {
		this.props.changeBookState(status === 'select' ? 'confirm' : 'select');
	}

	// 添加到购物车
	addProductTo(product_id) {
		this.props.addProduct(product_id, 1);
	}


	// 变换产品类型
	handleChangeTemplate(props, event) {
		let {xhttp, selectProductId} = props;
		let template_id = event.target.value;

		selectProductId(template_id);
		if (!template_id) return;

		this.getProductList(xhttp, { template_id });
		this.getTemplateDetail(xhttp, template_id);
	}

	render() {
		let {changeBookState, bookPageState, xhttp, category, product, entities} = this.props;
		let {pageState, productList} = bookPageState;
		return (
			<div className="book-index-page page">
				{!category.fetching && !product.fetching ? (
					<div className="book-index-index">
						<header className={classname({ 'list-header': true, hide: pageState === 'confirm' })}>
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


							<div className="ui search">
								<div className="ui icon input">
									<input className="prompt" type="text" placeholder="" />
									<i className="search icon"></i>
								</div>
							</div>
						</header>
						<div className="product-list">
							{product.items.length ? (
								<div className="book-index-select">
									<ul className="list">
										{product.items.map((product_id, product_index) => (
											<li key={product_index}>
												<div className="photo">

													<Link to={`/product/${product_id}`}>
														<img src={entities[product_id].category.photo ? `${window.server}/resource/${entities[product_id].category.photo}` : defaultCategoryPhoto} />
													</Link>

												</div>
												<div className="detail">
													<div className="l">
														<p className="code">No. {entities[product_id].code}</p>
														<p className="name">{entities[product_id].name}</p>
														<p className="unit-price">{window.accounting.formatMoney(entities[product_id].unit_price / 100, '￥')}</p>
													</div>
													<div className="r">
														<div className="action">
															<a className="ui button red" onClick={this.addProductTo.bind(this, product_id)}>订购</a>
														</div>
													</div>
												</div>
											</li>
										))}
									</ul>
								</div>) : (
									<div>暂无数据</div>
								)}
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

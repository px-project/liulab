/**
 * 选择产品预定
 */
import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router';
import classname from 'classname';
import defaultCategoryPhoto from '../../../public/images/default.png';
import { Loader, Select, Search, Image } from '../../common/';

export class BookComponent extends Component {
	componentWillMount() {
		let {xhttp} = this.props;
		xhttp.list('category', [], {});
		xhttp.list('product', [], {});
	}


	// 变换界面状态
	changeCurrentPageState(props, status, e) {
		this.props.changeBookState(status === 'select' ? 'confirm' : 'select');
	}

	// 添加到购物车
	addProductTo(product_id) {
		this.props.addProduct(product_id, 1);
	}


	render() {
		let {changeBookState, book, xhttp, category, product, entities} = this.props;
		let {pageState, productList} = book;
		return (
			<div className="book-index-page page">

				<header className={classname({ 'page-header': true, hide: pageState === 'confirm' })}>
					<div className="upload add">
						<Link to={'/book/upload'} className="ui button primary">批量上传</Link>
					</div>

					<Select className="category group" placeholder="所有品类" empty={true} change={this.selectCategory.bind(this)}>
						{category.items.map((category_id, category_index) => (
							<option key={category_index} value={category_id}>{entities[category_id].name}</option>
						))}
					</Select>

					<Search></Search>
				</header>
				<Loader loading={product.fetching} data={product.items}>
					<ul>
						{product.items.map((product_id, product_index) => (
							<li key={product_index}>
								<div className="photo">
									<Link to={`/product/${product_id}`}>
										<Image photo={entities[product_id].category.photo}></Image>
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
				</Loader>
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
}

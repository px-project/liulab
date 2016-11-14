/**
 * 选择商品下单方式的选择界面
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.scss';
import defaultCategoryPhoto from '../../../../public/images/huluwa.jpg';

export class BookSelectSelectComponent extends Component {
	componentWillMount() {

	}

	componentDidMount() {
		// $(this.refs.dropdown.getDOMNode()).dropdown();
	}

	// 变换界面状态
	changeCurrentPageState(props, status, e) {
		this.props.changeBookState(status === 'select' ? 'confirm' : 'select');
	}

	// 添加到购物车
	addProductTo(props, product_id) {
		props.addProduct(product_id, 1);
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
		let {entities, template, xhttp, product, bookPageState, changeBookState} = this.props;
		let {template_id} = bookPageState;

		return (
			<div className="book-select-select">
				{product.items.length ? (
					<div className="book-index-select">
						<ul className="list">
							{product.items.map((product_id, product_index) => (
								<li key={product_index}>
									<div className="avatar">
										<img src={entities[product_id].category.photo || defaultCategoryPhoto} />
									</div>
									<div className="info">
										<p className="name">{entities[product_id].name}</p>
										<p className="code">{entities[product_id].code}</p>
									</div>
									<div className="action">
										<a href="#" className="ui button icon circular red"><i className="fa fa-plus"></i></a>
									</div>
								</li>
							))}
						</ul>
					</div>) : (
						<div>暂无数据</div>
					)}
			</div>
		);
	}
}

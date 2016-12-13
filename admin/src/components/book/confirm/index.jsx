/**
 * 选择商品下单的确认界面
 */
import React, { Component } from 'react';
import {Link} from 'react-router';
import './style.scss';
import classname from 'classname';
import DefaultCover from '../../../public/images/default.png';

export class BookConfirmComponent extends Component {

	// 更改数量
	changeProductNum(product_id, changeNum) {
		this.props.addProduct(product_id, changeNum);
	}

	// 下单
	saveOrder(productList) {
		let {xhttp, entities, category, history} = this.props;
		let newData = {};

		for (let product_id in productList) {
			let num = productList[product_id];

			let category = newData.order[entities[product_id].category._id] = [];

			let productData = Object.assign({}, entities[product_id].data, { num });

			category.push(productData);
		}
		this.createOrder(newData, result => {
			history.pushState(null, '/order/' + result.order_id);
		});
	}

	render() {
		let {entities, category, xhttp, product, changeBookState, bookPageState} = this.props;
		let {productList} = bookPageState;

		return (
			<div className="book-select-confirm-page">
				<header className="list-header">
					<a className="button ui labeled left icon confirm" onClick={changeBookState.bind(this, 'select')}><i className="left arrow icon"></i>选择产品</a>
				</header>

				<table className="ui table">
					<thead>
						<tr>
							<th>序号</th>
							<th className="product">产品</th>
							<th>货号</th>
							<th>单价</th>
							<th>数量</th>
							<th>合计</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(productList).map((product_id, product_index) => (
							<tr key={product_index}>
								<td>{product_index + 1}</td>
								<td className="product">
									<img src={entities[product_id].category.photo ? `${window.server}/resource/${entities[product_id].category.photo}` : DefaultCover} />
									<span className="name">{entities[product_id].name}</span>
								</td>
								<td>{entities[product_id].code}</td>
								<td>{entities[product_id].unit_price}</td>
								<td className="num">
									<a onClick={this.changeProductNum.bind(this, product_id, -1)}>-</a>
									<span>{productList[product_id]}</span>
									<a onClick={this.changeProductNum.bind(this, product_id, 1)}>+</a>
								</td>
								<td>{entities[product_id].unit_price * productList[product_id]}</td>
								<td>
									<a>移除</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="btn-group">
					<Link to="/book/confirm" className="ui button primary" onClick={this.saveOrder.bind(this, productList)}>下单</Link>
				</div>
			</div>
		);
	}

	// 创建订单
	createOrder(newData, cb) {
		this.props.xhttp({ action: 'create', api: 'order', data: { products: newData } }, cb);
	}
}

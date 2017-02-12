/**
 * 选择商品下单的确认界面
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { currency } from '../../../utils';
import classname from 'classname';
import { Image } from '../../common';
import './style.scss';

export class BookConfirmComponent extends Component {

	// 下单
	saveOrder() {
		let {xhttp, book, entities, category, history, formData} = this.props, {selectProduct} = book;

		let newData = { description: formData.description, products: [] };

		newData.products = Object.keys(selectProduct).map(product_id => {
			let product = entities[product_id];
			return {
				name: product.name,
				code: product.code,
				num: selectProduct[product_id],
				unit_price: product.unit_price,
				category: product.category._id,
				attrs: Object.assign({}, ...product.category.attrs.filter((item, index) => index > 3).map(attr => ({ [attr.key]: product.attrs[attr.key] })))
			}
		});

		xhttp.create('order', [], newData).then(result => {
			history.pushState(null, '/order/' + result.order_id);
		});
	}


	render() {
		let {entities, category, xhttp, book, xbook, product, xform} = this.props,
			{selectProduct} = book, {changeProduct, addProduct} = xbook;

		return (
			<div className="book-select-confirm-page">
				<header className="page-header">
					<Link to={'/order'} className="button ui labeled left icon confirm"><i className="left arrow icon"></i>选择产品</Link>
				</header>

				<table className="ui table">
					<thead>
						<tr>
							<th>序号</th>
							<th className="product">产品</th>
							<th>编号</th>
							<th>单价</th>
							<th>数量</th>
							<th>合计</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(selectProduct).map((product_id, product_index) => (
							<tr key={product_index}>
								<td>{product_index + 1}</td>
								<td className="product">
									<Image src={entities[product_id].category.photo}></Image>
									<span className="name">{entities[product_id].name}</span>
								</td>
								<td>{entities[product_id].code}</td>
								<td>{currency.bind(this, entities[product_id].unit_price)}</td>
								<td className="num">
									<a onClick={changeProduct.bind(this, product_id, -1)}>-</a>
									<span>{selectProduct[product_id]}</span>
									<a onClick={changeProduct.bind(this, product_id, 1)}>+</a>
								</td>
								<td>{currency.bind(this, entities[product_id].unit_price * selectProduct[product_id])}</td>
								<td>
									<a>移除</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="ui form">
					<div className="field description">
						<label>备注</label>
						<textarea onChange={xform.change.bind(this, 'description')}></textarea>
					</div>
				</div>
				<div className="btn-group">
					<button className="ui button primary" onClick={this.saveOrder.bind(this)}>下单</button>
				</div>
			</div>
		);
	}
}

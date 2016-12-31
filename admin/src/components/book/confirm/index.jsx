/**
 * 选择商品下单的确认界面
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.scss';
import classname from 'classname';
import DefaultCover from '../../../public/images/default.png';

export class BookConfirmComponent extends Component {

	render() {
		let {entities, category, xhttp, product, changeBookState, bookPageState} = this.props;
		let {productList} = bookPageState;

		return (
			<div className="book-select-confirm-page">
				<header className="list-header">
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
						{Object.keys(productList).map((product_id, product_index) => (
							<tr key={product_index}>
								<td>{product_index + 1}</td>
								<td className="product">
									<img src={entities[product_id].category.photo ? `${window.server}/resource/${entities[product_id].category.photo}` : DefaultCover} />
									<span className="name">{entities[product_id].name}</span>
								</td>
								<td>{entities[product_id].code}</td>
								<td>{window.accounting.formatMoney(entities[product_id].unit_price / 100, '￥')}</td>
								<td className="num">
									<a onClick={this.changeProductNum.bind(this, product_id, -1)}>-</a>
									<span>{productList[product_id]}</span>
									<a onClick={this.changeProductNum.bind(this, product_id, 1)}>+</a>
								</td>
								<td>{window.accounting.formatMoney(entities[product_id].unit_price * productList[product_id] / 100, '￥')}</td>
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
						<textarea onChange={this.fieldChange.bind(this, 'description')}></textarea>
					</div>
				</div>
				<div className="btn-group">
					<button className="ui button primary" onClick={this.saveOrder.bind(this, productList)}>下单</button>
				</div>
			</div>
		);
	}

	// 更改数量
	changeProductNum(product_id, changeNum) {
		this.props.addProduct(product_id, changeNum);
	}

	// 表单字段变动
	fieldChange(field, e) {
		this.props.xform(e.target.value, field);
	}

	// 下单
	saveOrder(productList) {
		let {xhttp, entities, category, history, formData} = this.props;
		let newData = { description: formData.description, child_orders: [] };

		newData.child_orders = Object.keys(productList).map(product_id => {
			let product = entities[product_id];
			return {
				name: product.name,
				code: product.code,
				num: productList[product_id],
				unit_price: product.unit_price,
				category_id: product.category._id,
				attrs: Object.assign({}, ...product.category.attrs.filter((item, index) => index > 3).map(attr => ({ [attr.key]: product.attrs[attr.key] })))
			}
		});

		xhttp.create('order', [], newData).then(result => {
			history.pushState(null, '/order/' + result.order_id);
		});
	}

}

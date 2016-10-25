/**
 * 选择商品下单的确认界面
 */
import React, { Component } from 'react';
import './style.scss';
import classname from 'classname';

export class BookSelectConfirmComponent extends Component {

	// 更改数量
	changeProductNum(props, product_id, changeNum) {
		props.addProduct(product_id, changeNum);
	}

	// 下单
	saveOrder(props, productList) {
		let {xhttp, entities, template} = props;
		let newData = {};

		for (let product_id in productList) {
			let num = productList[product_id];

			let template = newData[entities[product_id].template_id._id] = [];

			let productData = Object.assign({}, entities[product_id].data, { num });

			template.push(productData);
		}
		xhttp({ action: 'create', api: 'order', data: { products: newData } }, (result) => {
			props.history.pushState(null, '/order/' + result.order_id);
		});
	}

	render() {
		let {entities, template, xhttp, product, changeBookState, bookPageState} = this.props;
		let {productList} = bookPageState;

		return (
			<div className="book-select-confirm-page">
				<header className="list-header">
					<a className="button ui labeled left icon confirm" onClick={changeBookState.bind(this, 'select')}><i className="left arrow icon"></i>选择产品</a>
				</header>

				{template.items.map((template_id, template_index) => (
					<div key={template_index}>
						<h5>{entities[template_id].name}</h5>
						<table className="ui table">
							<thead>
								<tr>
									<th>序号</th>
									{entities[template_id].template.map((field, field_index) => (
										<th key={field_index}>{field.title}</th>
									))}
									<th>数量</th>
								</tr>
							</thead>
							<tbody>
								{product.items.map((product_id, product_index) => (productList[product_id] && (
									<tr key={product_index}>
										<td>{product_index + 1}</td>
										{entities[template_id].template.map((field, field_index) => (
											<td key={field_index}>{entities[product_id].data[field.key]}</td>
										))}
										<td>
											<a className={classname({ hide: !productList[product_id] })} onClick={this.changeProductNum.bind(this, this.props, product_id, -1)}>-</a>
											<span>{productList[product_id]}</span>
											<a onClick={this.changeProductNum.bind(this, this.props, product_id, 1)}>+</a>
										</td>
									</tr>)
								))}
							</tbody>
						</table>
					</div>
				))}

				<div className="btn-group">
					<button className="ui button primary" onClick={this.saveOrder.bind(this, this.props, productList)}>下单</button>
				</div>
			</div>
		);
	}
}

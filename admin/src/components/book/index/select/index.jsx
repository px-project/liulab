/**
 * 选择商品下单方式的选择界面
 */
import React, { Component } from 'react';
import './style.scss';

export class BookSelectSelectComponent extends Component {
	componentWillMount() {
		let {xhttp} = this.props;
		this.getProductList(xhttp);
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
				{entities[template_id] && (
					<div>
						<table className="ui table">
							<thead>
								<tr>
									<th>序号</th>
									{entities[template_id].template.map((field, index) => (<th key={index}>{field.title}</th>))}
									<th>创建人</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								{product.items.length && product.items.map((product_id, product_index) => (
									<tr key={product_index}>
										<td>{product_index + 1}</td>
										{entities[template_id].template.map((field, field_index) => (
											<td key={field_index}>{entities[product_id].data[field.key]}</td>
										))}
										<td>{entities[product_id].create_user}</td>
										<td>
											<a onClick={this.addProductTo.bind(this, this.props, product_id)}><i className="icon plus"></i></a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>)}
			</div>
		);
	}

	// 获取产品列表
	getProductList(xhttp, conditions = {}) {
		xhttp({ action: 'list', api: 'product', conditions });
	}

	// 获取模板列表
	getTemplateList(xhttp, conditions = {}) {
		xhttp({ action: 'list', api: 'template', conditions });
	}

	// 获取模板详情
	getTemplateDetail(xhttp, template_id) {
		xhttp({ action: 'detail', api: 'template', params: [template_id] });
	}

}

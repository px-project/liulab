/**
 * 上传方式预览界面
 */
import React, { Component } from 'react';
import './style.scss';

export class BookUploadPreviewComponent extends Component {
	// 创建订单
	createOrder(e) {
		let {xhttp, categoryUpload, entities, formData, history} = this.props;
		let newData = { description: formData.description, products: [] };

		let orders = entities[categoryUpload.items[categoryUpload.items.length - 1]].result;


		Object.keys(orders).map(category_id => {
			orders[category_id].forEach(product => {
				newData.products.push({
					name: product.name,
					code: product.code,
					num: product.num,
					unit_price: product.unit_price,
					category_id,
					attrs: Object.assign({}, ...entities[category_id].attrs.filter((item, index) => index > 3).map(attr => ({ [attr.key]: product[attr.key] })))
				});
			});
		});

		xhttp.create('order', newData, result => {
			history.pushState(null, '/order/' + result.order_id);
		});
	}

	// 重新上传
	reUpload(props, e) {
		let {changeBookState} = props;
		props.changeBookState('upload');
	}

	render() {
		let {categoryUpload, entities, bookPageState} = this.props;
		let {selectCategory} = bookPageState;
		let categoryArr = Object.keys(selectCategory).filter(category_id => selectCategory[category_id]);
		let {result} = entities[categoryUpload.items[categoryUpload.items.length - 1]];

		return (
			<div>
				{categoryArr.map((category_id, index) => (
					<div key={index} className="product">
						<h5>{entities[category_id].name}</h5>
						<div className="data">
							<table className="ui table">
								<thead>
									<tr>
										<th>序号</th>
										{entities[category_id].attrs.map((attr, attr_index) => (
											<th key={attr_index}>{attr.title}</th>
										))}
									</tr>
								</thead>
								<tbody>
									{result[category_id].map((row, row_index) => (
										<tr key={row_index}>
											<td>{row_index + 1}</td>
											{entities[category_id].attrs.map((attr, attr_index) => (
												<td key={attr_index}>{row[attr.key]}</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				))}

				<div className="ui form">
					<div className="field description">
						<label>备注</label>
						<textarea onChange={this.chnageField.bind(this, 'description')}></textarea>
					</div>
				</div>

				<div className="btn-group">
					<button className="ui primary button" onClick={this.createOrder.bind(this)}>确认</button>
					<button className="ui red button" onClick={this.reUpload.bind(this, this.props)}>重新上传</button>
				</div>
			</div>
		);
	}

	// 处理表单变动
	chnageField(field, e) {
		this.props.xform(e.target.value, field);
	}
}

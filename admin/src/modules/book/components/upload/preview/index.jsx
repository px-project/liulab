/**
 * 上传方式预览界面
 */
import React, { Component } from 'react';
import './style.scss';

export class BookUploadPreviewComponent extends Component {
	// 创建订单
	createOrder(e) {
		let {xhttp, formData, history} = this.props;

		xhttp.create('order', [], formData).then(result => {
			history.pushState(null, '/order/' + result.order_id);
		});
	}

	// 重新上传
	reUpload(e) {
		let {xbook} = this.props, {changeState} = xbook;
		changeState('upload');
	}

	render() {
		let {entities, formData, xhttp, xform, book} = this.props, {products, description} = formData, {selectCategory} = book;

		let categoryArr = Object.keys(selectCategory).filter(category_id => selectCategory[category_id]);

		return (
			<div className="book-upload-preview">
				{categoryArr.map((category_id, category_index) => (
					<div key={category_id} className="product">
						<h3>{entities[category_id].name}</h3>
						<div className="data">
							<table className="ui table">
								<thead>
									<tr>
										<th>序号</th>
										{entities[category_id].attrs.map((attr, index) => (
											<th key={index}>{attr.title}</th>
										))}
									</tr>
								</thead>
								<tbody>
									{products.filter(product => product.category === category_id).map((product, product_index) => (
										<tr key={product_index}>
											<td>{product_index + 1}</td>
											{entities[category_id].attrs.map((attr, index) => (
												<td key={index}>{product[attr.key]}</td>
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
						<textarea value={description} onChange={xform.change.bind(this, 'description')}></textarea>
					</div>
				</div>

				<div className="btn-group">
					<button className="ui primary button" onClick={this.createOrder.bind(this)}>确认</button>
					<button className="ui red button" onClick={this.reUpload.bind(this)}>重新上传</button>
				</div>
			</div>
		);
	}
}

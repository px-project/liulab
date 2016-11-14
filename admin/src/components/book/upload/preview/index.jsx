/**
 * 上传方式预览界面
 */
import React, {Component} from 'react';
import './style.scss';

export class BookUploadPreviewComponent extends Component {
	// 创建订单
	createOrder (props, e) {
		let {xhttp, categoryUpload, entities} = props;
		let newData = {order: entities[categoryUpload.items[categoryUpload.items.length - 1]].result};

		xhttp({
			action: 'create',
			api: 'order',
			data: newData
		}, (result) => {
			props.history.pushState(null, '/order/' + result.order_id);
		});
	}

	// 重新上传
	reUpload (props, e) {
		let {changeBookState} = props;
		props.changeBookState('upload');
	}

	render () {
		let {categoryUpload, entities, bookPageState} = this.props;

		let category_ids = this.props.category.items.filter((item, index) => bookPageState.productTypeIndex[index]);

		let {result} = entities[categoryUpload.items[categoryUpload.items.length - 1]];

		return (
			<div>
				{category_ids.map((category_id, index) => (
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
												<td key={attr_index}>{row[attr.field]}</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				))}
				<div className="btn-group">
					<button className="ui primary button" onClick={this.createOrder.bind(this, this.props)}>确认</button>
					<button className="ui red button" onClick={this.reUpload.bind(this, this.props)}>重新上传</button>
				</div>
  			</div>
		);
	}
}

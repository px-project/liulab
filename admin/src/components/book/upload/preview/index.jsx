/**
 * 上传方式预览界面
 */
import React, {Component} from 'react';
import './style.scss';
import { Tabs, Table, Button } from 'antd';
const TabPane = Tabs.TabPane;

export class BookUploadPreviewComponent extends Component {
	// 创建订单
	createOrder (props, e) {
		let {xhttp, templateUpload, entities} = props;
		let newData = {products: entities[templateUpload.items[templateUpload.items.length - 1]].result};

		xhttp({
			action: 'create',
			api: 'order',
			data: newData
		}, (result) => {
			// props.history.pushState(null, '/order/' + result.order_id);
		});
	}

	// 重新上传
	reUpload (props, e) {
		let {changeBookState} = props;
		props.changeBookState('upload');
	}

	render () {
		let {templateUpload, entities} = this.props;

		let template_ids = this.props.template.items.filter((item, index) => this.props.bookPageState.productTypeIndex[index]);

		let {result} = entities[templateUpload.items[templateUpload.items.length - 1]];

		return (
			<div>
				{template_ids.map((template_id, index) => (
					<div key={index} className="product">
						<h5>{entities[template_id].name}</h5>
						<div className="data">
							<table className="ui table">
								<thead>
									<tr>
										<th>序号</th>
										{entities[template_id].template.map((tpl) => (
											<th>{tpl.title}</th>
										))}
									</tr>
								</thead>
								<tbody>
									{result[template_id].map((row, row_index) => (
										<tr>
											<td>{row_index + 1}</td>
											{entities[template_id].template.map((tpl) => (
												<td>{row[tpl.key]}</td>
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

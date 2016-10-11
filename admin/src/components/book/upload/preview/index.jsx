/**
 * 上传方式预览界面
 */
import React, {Component} from 'react';
import './style.scss';
import { Tabs, Table, Button } from 'antd';
const TabPane = Tabs.TabPane;

export class BookUploadPreviewComponent extends Component {
	// 创建订单
	createOrder (props, newOrderData, e) {
		let {xhttp} = props;
		let newData = {products: {}};

		newOrderData.map((item) => newData.products[item.productType] = item.data);

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

		let {result, field} = entities[templateUpload.items[templateUpload.items.length - 1]];
		let uploadData = result;

		let newOrderData = [];
		for (let productType in uploadData) {
			newOrderData.push({
				productType,
				data: uploadData[productType]
			});
		}

		return (
			<div>
				{
					newOrderData.map((item, index) => {
						let columns = [];

						field[index].map((key, key_index) => {
							columns.push({
								title: key,
								dataIndex: 'A' + key,
								key: key_index
							});
						});

						return (
							<div key={index}>
								<h5>{item.productType}</h5>
								<Table columns={columns} dataSource={item.data}></Table>
							</div>
						);
					})
				}
				<Button type="primary" onClick={this.createOrder.bind(this, this.props, newOrderData)}>确认</Button>
				<Button type="ghost" onClick={this.reUpload.bind(this, this.props)}>重新上传</Button>
  			</div>
		);
	}
}

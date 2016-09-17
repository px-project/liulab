/**
 * 确认组件
 */
import React, {Component} from 'react';
import {Table, Tabs, Button} from 'antd';
const TabPane = Tabs.TabPane;
import './style.scss';

export class ConfirmComponent extends Component {
	componentWillReceiveProps (nextProps) {
		if (nextProps) {

		}
	}


	saveOrder (orderData, xhttp, e) {
		let reqData = {
			products: orderData.data
		};
		xhttp({
			action: 'create',
			api: 'order',
			reload: false,
			data: reqData
		});
	}


	render () {
		let orderData = this.props.resource.items[0];
		orderData.data = orderData.data || [];

		return (
			<div>
				<p>
					<span>您刚刚上传的文件数据如下，请严格进行校验，以免审核失败。</span>
					<a onClick={this.props.changeBookState.bind(this, 'upload')}>重新上传</a>
				</p>
				<Tabs defaultActiveKey="tab_0">
				{
					orderData.data.map((sheet, index) => {

						let columns = [];

						sheet.fields.map((field, _index) => {
							columns.push({
								title: field.title,
								dataIndex: field.key,
								key: index + '_table_' + _index,
								width: 100
							});
						});

						// 第一列固定
						columns[0].fixed = 'left';
						columns[0].width = 100;


						return (
							<TabPane key={'tab_' + index} tab={sheet.product_type}>
								<Table columns={columns} dataSource={sheet.data[index]} scroll={{ x: 1300 }} pagination={false}></Table>
							</TabPane>
						);
					})
				}
				</Tabs>
				<Button type="primary" onClick={this.saveOrder.bind(this, orderData, this.props.xhttp)}>确认</Button>
			</div>
		)
	}
}

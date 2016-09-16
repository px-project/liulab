/**
 * 确认组件
 */
import React, {Component} from 'react';
import {Table, Tabs} from 'antd';
import './style.scss';
const TabPane = Tabs.TabPane;

export class ConfirmComponent extends Component {
	render () {
		let orderData = this.props.resource.items[0];

		let columns = [];

		return (
			<div>
				<Tabs defaultActiveKey="0">
				{
					orderData.data.map((sheet, index) => {
						sheet.names.map((title, _index) => {
							columns.push({
								title,
							});
						});


						return (
							<TabPane key={index} tab={sheet.product_type}>
								<Table columns={columns} dataSource={sheet.data}></Table>
							</TabPane>
						);
					})
				}
				</Tabs>
			</div>
		)
	}
}

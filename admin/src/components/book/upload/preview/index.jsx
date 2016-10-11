/**
 * 上传方式预览界面
 */
import React, {Component} from 'react';
import './style.scss';
import { Tabs, Table, Button } from 'antd';
const TabPane = Tabs.TabPane;

export class BookUploadPreviewComponent extends Component {
	render () {
		let {templateUpload, entities} = this.props;
		let uploadData = entities[templateUpload.items[templateUpload.items.length - 1]].result;

		let newOrderData = [];
		for (let productType in uploadData) {
			newOrderData.push({
				productType,
				data: uploadData[productType]
			})
		}

		let columns = [
			// {
			// 	title:
			// }
		]




		return (
			<div>
				<Tabs defaultActiveKey="1">
				{
					newOrderData.map((item, index) => {
						let columns = [

						];

						let tableData = [];
						return (
							<TabPane tab={item.productType} key={index}>
								<Table columns={columns} dataSource={tableData}></Table>
							</TabPane>
						);
					})
				}
				</Tabs>
				<Button>确认</Button>
				<Button>重新上传</Button>
  			</div>
		);
	}
}

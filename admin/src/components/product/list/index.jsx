/**
 * 产品列表组件
 */
import React, {Component} from 'react';
import {ListHeader} from '../../common/list_header/';
import {Table} from 'antd';

const tableConfig = [
	{
		title: '序号',
		render: (text, record, index) => {
			return index + 1;
		}
	},
	{
		title: '产品名称',
		dataIndex: 'name'
	}
];



export class ProductList extends Component {
	componentWillMount () {
		this.props.fetchProductList();
	}
	render () {
		let {productList} = this.props;
		return (
			<div>
				<ListHeader></ListHeader>
				<Table columns={tableConfig} dataSource={productList}></Table>
			</div>
		);
	}
}

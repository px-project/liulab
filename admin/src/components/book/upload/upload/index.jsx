/**
 * 上传方式上传界面
 */
import React, { Component } from 'react';
import './style.scss';
import { Icon } from 'antd';
let apiConfig = require('../../../../config/api.json');
apiConfig.server = window.server;

export class BookUploadUploadComponent extends Component {

	componentWillMount() {
		this.props.category.items.filter((item, index) => this.props.bookPageState.productTypeIndex[index])
			.forEach((_id) => {
				this.props.xhttp({
					action: 'detail',
					api: 'category',
					reload: true,
					params: [_id]
				});
			});
	}

	// 上传excel
	uploadOrderExcel(props, e) {
		let {xhttp, changeBookState} = props;
		let file = e.target.files[0];
		let reqData = new FormData();
		reqData.append('file', file);
		let category_id = props.category.items.filter((item, index) => props.bookPageState.productTypeIndex[index]);
		xhttp({
			action: 'create',
			api: 'categoryUpload',
			params: [category_id],
			reload: true,
			data: reqData
		}, (result) => {
			changeBookState('preview');
		});
	}

	render() {

		let {bookPageState, category, xhttp} = this.props;
		let {productTypeIndex} = bookPageState;

		return (
			<div className="book-upload-upload">
				<div className="download">
					<a href={apiConfig.server + apiConfig.categoryDownload + '?category_id=' + (category.items.filter((item, index) => productTypeIndex[index])).join('&category_id=')}>下载模板文件</a>
				</div>
				<div className="upload">
					<Icon type="upload" />
					<p className="main">点击上传订单数据</p>
					<p className="describe">请先下载模板文件并严格按照其规则填写，且无修改模板文件。</p>
					<input type="file" onChange={this.uploadOrderExcel.bind(this, this.props)} />
				</div>
			</div>
		);
	}
}

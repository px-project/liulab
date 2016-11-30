/**
 * 上传方式上传界面
 */
import React, { Component } from 'react';
import './style.scss';
let apiConfig = require('../../../../config/api.json');
apiConfig.server = window.server;

export class BookUploadUploadComponent extends Component {

	componentWillMount() {
	}

	// 上传excel
	uploadOrderExcel(props, e) {
		let {xhttp, changeBookState, bookPageState} = props;
		let {selectCategory} = bookPageState;
		let categoryArr = Object.keys(selectCategory).filter(category_id => selectCategory[category_id]);
		
		let file = e.target.files[0];
		let reqData = new FormData();
		reqData.append('file', file);

		xhttp({
			action: 'create',
			api: 'categoryUpload',
			params: [categoryArr.join(',')],
			data: reqData
		}, result => {
			changeBookState('preview');
		});
	}

	render() {

		let {bookPageState, category, xhttp} = this.props;
		let {selectCategory} = bookPageState;
		let categoryArr = Object.keys(selectCategory).filter(category_id => selectCategory[category_id]);

		return (
			<div className="book-upload-upload">
				<div className="download-sec">
					<a href={`${apiConfig.server}${apiConfig.categoryDownload}?category_id=${categoryArr.join('&category_id=')}`}>
						<i className="icon cloud download"></i>
						<span className="main">下载模板文件</span>
					</a>
				</div>
				<div className="upload-sec">
					<i className="icon cloud upload"></i>
					<p className="main">上传订单数据</p>
					<input type="file" onChange={this.uploadOrderExcel.bind(this, this.props)} />
				</div>
				<p className="describe">注：请严格按照规则填写，切勿修改模板文件内容。</p>
			</div>
		);
	}
}

/**
 * 上传方式上传界面
 */
import React, { Component } from 'react';
import './style.scss';

export class BookUploadUploadComponent extends Component {

	// 上传excel
	uploadOrderData(props, e) {
		let {xhttp, book, xbook} = props, {selectCategory} = book, {changeState} = xbook;
		let categoryArr = Object.keys(selectCategory).filter(category_id => selectCategory[category_id]);

		xhttp.upload('categoryTemplate', [categoryArr.join(',')], { file: e.target.files[0] }).then(result => {
			changeState('preview');
		});
	}

	// 下载模板
	download() {
		let {book, category, xhttp, entities} = this.props, {selectCategory} = book;
		let categoryArr = Object.keys(selectCategory).filter(category_id => selectCategory[category_id]);
		let ids = Object.keys(selectCategory).filter(category_id => selectCategory[category_id]);
		let names = ids.map(id => entities[id].name);
		xhttp.download('categoryTemplate', [categoryArr.join(',')], {}, { name: names.join('_') + '.xlsx' });
	}

	render() {
		return (
			<div className="book-upload-upload">
				<div className="download-sec">
					<a onClick={this.download.bind(this)}>
						<i className="icon cloud download"></i>
						<span className="main">下载模板文件</span>
					</a>
				</div>
				<div className="upload-sec">
					<i className="icon cloud upload"></i>
					<p className="main">上传订单数据</p>
					<input type="file" onChange={this.uploadOrderData.bind(this, this.props)} />
				</div>
				<p className="describe">注：请严格按照规则填写，切勿修改模板文件内容。</p>
			</div>
		);
	}

}

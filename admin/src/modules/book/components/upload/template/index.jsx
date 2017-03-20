/**
 * 上传方式上传界面
 */
import React from 'react';
import './style.scss';
import { url } from '../../../../common';

export const BookUploadTemplate = ({ download, xhttp, book_upload_category, upload }) => {
	let templateUrl = url('category_template', [book_upload_category.join(',')]);
	return (
		<div className="book-upload-upload">
			<div className="download-sec">
				<a onClick={download}>
					<i className="icon cloud download"></i>
					<span className="main">下载模板文件</span>
				</a>
			</div>
			<div className="upload-sec">
				<i className="icon cloud upload"></i>
				<p className="main">上传订单数据</p>
				<input type="file" onChange={upload} />
			</div>
			<p className="describe">注：请严格按照规则填写，切勿修改模板文件内容。</p>
		</div>
	)
};
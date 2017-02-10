/**
 * 上传界面
 */
import React, { Component } from 'react';
import classname from 'classname';
import { BookUploadSelectComponent as UploadSelect } from '../select/';
import { BookUploadUploadComponent as UploadUpload } from '../upload/';
import { BookUploadPreviewComponent as UploadPreview } from '../preview/';
import './style.scss';

export class BookUploadComponent extends Component {
	componentWillMount() {
		// init
		this.props.xbook.changeState('select');
	}

	render() {
		let {state} = this.props.book;

		let allState = {
			'select': '选择品类',
			'upload': '上传文件',
			'preview': '确认订单'
		}

		let currentIndex = Object.keys(allState).indexOf(state);

		return (
			<div className="book-upload-page page">
				<div className="step">
					<ul>
						{Object.keys(allState).map((status, index) => (
							<li key={index} className={classname({ done: index < currentIndex, active: index == currentIndex, todo: index > currentIndex })}>
								<div className="index">{index + 1}</div>
								<div className="info">
									<span className="title">{allState[status]}</span>
								</div>
							</li>
						))}
					</ul>
				</div>
				<div className="page">
					{state === 'select' && <UploadSelect {...this.props}></UploadSelect>}
					{state === 'upload' && <UploadUpload {...this.props}></UploadUpload>}
					{state === 'preview' && <UploadPreview {...this.props}></UploadPreview>}
				</div>
			</div>
		);
	}
}

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
		this.props.changeBookState('select');
	}

	render() {
		let status = this.props.bookPageState.pageState;

		let allState = {
			'select': '选择品类',
			'upload': '上传文件',
			'preview': '确认订单'
		}

		let currentStatusIndex = Object.keys(allState).indexOf(status);

		return (
			<div className="book-upload-page page">
				<div className="step">
					<ul>
						{Object.keys(allState).map((status, status_index, statusArr) => (
							<li key={status_index} className={classname({ done: status_index < currentStatusIndex, active: status_index == currentStatusIndex, todo: status_index > currentStatusIndex })}>
								<div className="index">{status_index + 1}</div>
								<div className="info">
									<span className="title">{allState[status]}</span>
								</div>
							</li>
						))}
					</ul>
				</div>
				<div className="page">
					{status === 'select' && <UploadSelect {...this.props}></UploadSelect>}
					{status === 'upload' && <UploadUpload {...this.props}></UploadUpload>}
					{status === 'preview' && <UploadPreview {...this.props}></UploadPreview>}
				</div>
			</div>
		);
	}
}

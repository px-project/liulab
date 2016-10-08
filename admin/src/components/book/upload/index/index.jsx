/**
 * 上传界面
 */
import React, {Component} from 'react';
import {Steps} from 'antd';
const Step = Steps.Step;
import {BookUploadSelectComponent as UploadSelect} from '../select/';
import {BookUploadUploadComponent as UploadUpload} from '../upload/';
import {BookUploadPreviewComponent as UploadPreview} from '../preview/';
import './style.scss';

export class BookUploadComponent extends Component {
	componentWillMount () {
		// init
		this.props.changeBookState('select');
		this.props.selectProductType(-1, 0);
	}

	render () {
		let status = this.props.bookPageState.pageState;

		let allState = ['select', 'upload', 'preview'];

		return (
			<div className="upload-page">
				<Steps size="small" current={allState.indexOf(status)}>
					<Step title="选择产品类型" />
					<Step title="批量上传文件" />
					<Step title="预览确认" />
				</Steps>
				{status === 'select' ? (<UploadSelect {...this.props}></UploadSelect>) : ''}
				{status === 'upload' ? (<UploadUpload {...this.props}></UploadUpload>) : ''}
				{status === 'preview' ? (<UploadPreview {...this.props}></UploadPreview>) : ''}
			</div>
		);
	}
}

/**
 * 上传方式上传界面
 */
import React, {Component} from 'react';
import './style.scss';
import {Icon} from 'antd';

export class BookUploadUploadComponent extends Component {

	componentWillMount () {

	}

	// 获取模板
	getTemplate (props, e) {
		let {xhttp, bookPageState, template} = props;
		let {productTypeIndex} = bookPageState;

        let templates = template.items.filter((item, index) => productTypeIndex[index]);

		xhttp({
			action: 'create',
			api: 'templateDownload',
			data: {templates}
		});
	}

	// 上传excel
	uploadOrderExcel (props, e) {
		let {xhttp, changeBookState} = props;
		let file = e.target.files[0];
		let reqData = new FormData();
		reqData.append('file', file);
		xhttp({
			action: 'create',
			api: 'templateUpload',
			reload: true,
			data: reqData
		}, (result) => {
			changeBookState('preview');
		});
	}

    render () {
        return (
            <div>
            	<div className="download">
            		<a onClick={this.getTemplate.bind(this, this.props)}>下载模板文件</a>
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

/**
 * 上传方式上传界面
 */
import React, {Component} from 'react';
import './style.scss';
import { Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  showUploadList: false,
  action: '/upload.do',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export class BookUploadUploadComponent extends Component {

	componentWillMount () {

	}

	getTemplate (props, e) {
		let {xhttp, bookPageState, template} = props;
		let {productTypeIndex} = bookPageState;

		let templates = productTypeIndex.map((index) => template.items[index]);

		xhttp({
			action: 'create',
			api: 'templateDownload',
			data: {templates}
		});
	}



	uploadOrderExcel (xhttp, e) {
		let file = e.target.files[0];
		let reqData = new FormData();
		reqData.append('file', file);
		reqData.append('type', 'xlsx');
		xhttp({
			action: 'create',
			api: 'resource',
			reload: true,
			data: reqData
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
					<input type="file" onChange={this.uploadOrderExcel.bind(this, this.props.xhttp)} />
            	</div>
            </div>
        );
    }
}

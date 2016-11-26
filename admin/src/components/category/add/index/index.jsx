/**
 * 添加模板组件
 */
import React, { Component } from 'react';
import { TemplateNewFieldComponent as NewField } from '../new_field/';
import {UploadImgComponent as UploadImg} from '../../../common/upload_img';
import './style.scss';

export class CategoryAddComponent extends Component {
	componentWillMount() {
		// init form data
		this.props.xform({
			name: '',
			fields: [],
			newField: { key: '', title: '', type: '', required: false }
		});
	}

	render() {
		let {xform, formData, xhttp} = this.props;
		return (
			<div className="category-add-page page ui form">
				<div className="basic sec">
					<h3 className="sec-title">品类信息</h3>
					<div className="photo">
						<UploadImg filename={formData.photo} fileKey="photo" {...this.props}></UploadImg>
					</div>
					<div className="info">
						<div className="field inline">
							<label>名称</label>
							<input type="text" onChange={this.fieldChange.bind(this, 'name')} />
						</div>

						<div className="field inline description">
							<label>简介</label>
							<input type="text" onChange={this.fieldChange.bind(this, 'description')} />
						</div>
					</div>
				</div>
				<div className="field-config sec">
					<h3 className="sec-title">字段配置</h3>
					<ol className="list">
						{formData.fields ? formData.fields.map((item, index) => (
							<li key={index}>
								<p className="index">{index + 1}.</p>
								<div className="detail">
									<p className="map field-title">
										<span className="title">字段名</span>
										<span className="value">{item.title}</span>
									</p>
									<p className="map">
										<span className="title">数据名</span>
										<span className="value">{item.key}</span>
									</p>
									<p className="map">
										<span className="title">类型</span>
										<span className="value">{item.type}</span>
									</p>
									<p className="map">
										<span className="title">必填</span>
										<span className="value">{item.required ? '是' : '否'}</span>
									</p>
								</div>
							</li>
						)) : ''}
					</ol>
				</div>
				
				{formData.newField ? (<NewField {...this.props}></NewField>): ''}

				<div className="btn-group sec">
					<button className="ui button primary" onClick={this.createCategory.bind(this, xhttp, formData)}>保存</button>
					<button className="ui button red">取消</button>
				</div>
			</div>
		);
	}

	// 处理模板名称变动
	fieldChange(field, e) {
		this.props.xform(e.target.value, field);
	}

	// 创建模板数据
	createCategory(xhttp, formData) {
		xhttp({
			action: 'create',
			api: 'category',
			data: { name: formData.name, attrs: formData.fields, description: formData.description }
		}, () => {
			this.props.history.pushState(null, '/category');
		});
	}

}

/**
 * 添加模板组件
 */
import React, { Component } from 'react';
import { TemplateNewFieldComponent as NewField } from '../new_field/';
import './style.scss';

export class CategoryAddComponent extends Component {
	componentWillMount() {
		let {xform} = this.props;

		// init form data
		xform({
			name: '',
			fields: [],
			newField: { key: '', title: '', type: '', required: false }
		});
	}



	render() {
		let {xform, formData, xhttp} = this.props;
		return (
			<div className="category-add ui form">
				<div className="field inline">
					<label>模板名称</label>
					<input type="text" onChange={this.handleCategoryName.bind(this, xform)}/>
				</div>
				{
					formData.fields ? formData.fields.map((item, index) => (
						<div key={index}>
							<p>{index + 1}. </p>
							<p><span className="title">字段名</span><span className="value">{item.title}</span></p>
							<p><span className="title">数据名</span><span className="value">{item.key}</span></p>
							<p><span className="title">类型</span><span className="value">{item.type}</span></p>
							<p><span className="title">必填</span><span className="value">{item.required ? '是' : '否'}</span></p>
						</div>
					)) : ''
				}
				<NewField {...this.props}></NewField>

				<div className="btn-group">
					<button className="ui button primary" onClick={this.createCategory.bind(this, xhttp, formData)}>保存</button>
					<button className="ui button red">取消</button>
				</div>
			</div>
		);
	}

	// 处理模板名称变动
	handleCategoryName (xform, e) {
		xform(e.target.value, 'name');
	}

	// 创建模板数据
	createCategory(xhttp, formData) {
		xhttp({
			action: 'create',
			api: 'template',
			data: {name: formData.name, template: formData.fields}
		});
	}

}

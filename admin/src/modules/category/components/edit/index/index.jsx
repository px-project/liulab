/**
 * 编辑模板组件
 */
import React, { Component } from 'react';
import { TemplateNewFieldComponent as NewField } from '../new_field/';
import { INIT_ATTRS, NEW_ATTRS } from '../../../../../constants/';
import { Upload, Loader, FormGroup, Field } from '../../../../common/';
import './style.scss';

export class CategoryEditComponent extends Component {

	constructor(props) {
		super(props);
		this.state = { page: props.routes[2].path === 'add' ? 'add' : 'edit' };
	}

	componentWillMount() {
		let {props, state} = this, {xform, xhttp, params} = props, {page} = state;

		// 添加
		if (page === 'add') {
			xform.init({ attrs: INIT_ATTRS, new_attr: NEW_ATTRS });
		}

		// 编辑
		if (page === 'edit') {
			xhttp.detail('category', [params.category_id]).then(result => {
				xform.init(Object.assign({}, result, { new_attr: NEW_ATTRS }));
			});
		}
	}

	render() {
		let {props, state} = this, {page} = state, {xform, formData = { attrs: [] }, category} = props;

		return (
			<Loader className="category-edit-page page" loading={page === 'edit' && category.fetching}>
				<div className="basic sec ui form">
					<h3 className="sec-title">品类信息</h3>
					<Upload {...this.props} className="cover"></Upload>
					<div className="info">
						<FormGroup label="名称">
							<input type="text" value={formData.name} onChange={xform.change.bind(this, 'name')} />
						</FormGroup>
						<FormGroup label="缩写">
							<input type="text" value={formData.abbr} onChange={xform.change.bind(this, 'abbr')} />
						</FormGroup>
						<FormGroup label="简介" className="description">
							<input type="text" value={formData.description} onChange={xform.change.bind(this, 'description')} />
						</FormGroup>
					</div>
				</div>
				<div className="field-config sec ui form">
					<h3 className="sec-title">字段配置</h3>
					<ol className="list">
						{formData.attrs ? formData.attrs.map((item, index) => (
							<li key={index}>
								<div>
									<Field name="字段名" className="field-title">{item.title}</Field>
									<Field name="必填" className="field-required">{item.attr_required ? '是' : '否'}</Field>
								</div>
								<div>
									<Field name="数据名" className="field-key">{item.key}</Field>
									<Field name="类型" className="field-type">{item.attr_type}</Field>
								</div>
							</li>
						)) : ''}
					</ol>
				</div>

				{formData.new_attr ? (<NewField {...this.props}></NewField>) : ''}

				<div className="btn-group sec">
					<button className="ui button primary" onClick={this.save.bind(this)}>保存</button>
					<button className="ui button red">取消</button>
				</div>
			</Loader>
		);
	}

	// 保存品类
	save() {
		let {props, state} = this, {xhttp, formData, history, params} = props, {page} = state;

		if (page === 'add') {
			return xhttp.create('category', [], formData).then(result => this.redirect(result._id));
		}
		if (page === 'edit') {
			return xhttp.update('category', [params.category_id], formData).then(result => this.redirect(result._id));
		}
	}

	// 重定向到详情界面
	redirect(category_id) {
		let {history} = this.props;
		history.push(null, `/category/${category_id}`);
	}
}

/**
 * 编辑模板组件
 */
import React, { Component } from 'react';
import { TemplateNewFieldComponent as NewField } from '../new_field/';
import { UploadImgComponent as UploadImg } from '../../../common/upload_img';
import './style.scss';

// init form data
const initFields = [
	{ key: 'name', title: '产品名称', attr_type: 'string', attr_required: true },
	{ key: 'code', title: '编号', attr_type: 'string', attr_required: false },
	{ key: 'unit_price', title: '单价(元)', attr_type: 'number', attr_required: true },
	{ key: 'num', title: '数量', attr_type: 'number', attr_required: true }
];

const newField = { key: '', title: '', attr_type: '', attr_required: false };

export class CategoryEditComponent extends Component {
	componentWillMount() {
		let {routes, xform, xhttp, params} = this.props;

		// 添加
		if (routes[2].path === 'add') {
			this.props.xform({ name: '', fields: initFields, newField });
		}

		// 编辑
		if (routes[2].path === ':category_id/edit') {
			xhttp.detail('category', [params.category_id], {}, category => {
				category.fields = _.cloneDeepWith(category.attrs);
				delete category.attrs;
				this.props.xform(Object.assign({}, category, newField));
			});
		}

	}

	render() {
		let {xform, formData, routes} = this.props;
		let pageStatus = routes[2].path === 'add' ? 'add' : 'edit';

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
							<input type="text" value={formData.name} onChange={this.fieldChange.bind(this, 'name')} />
						</div>

						<div className="field inline">
							<label>缩写</label>
							<input type="text" value={formData.abbr} onChange={this.fieldChange.bind(this, 'abbr')} />
						</div>

						<div className="field inline description">
							<label>简介</label>
							<input type="text" value={formData.description} onChange={this.fieldChange.bind(this, 'description')} />
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
										<span className="value">{item.attr_type}</span>
									</p>
									<p className="map">
										<span className="title">必填</span>
										<span className="value">{item.attr_required ? '是' : '否'}</span>
									</p>
								</div>
							</li>
						)) : ''}
					</ol>
				</div>

				{formData.newField ? (<NewField {...this.props}></NewField>) : ''}

				<div className="btn-group sec">
					<button className="ui button primary" onClick={this.createCategory.bind(this)}>保存</button>
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
	createCategory() {
		let {xhttp, formData, history} = this.props;

		let newData = { name: formData.name, abbr: formData.abbr, attrs: formData.fields, description: formData.description, photo: formData.photo };
		xhttp.create('category', [], newData, () => {
			history.pushState(null, '/category');
		});
	}

}

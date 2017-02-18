/**
 * 编辑模板组件
 */
import React, { Component } from 'react';
import { TemplateNewFieldComponent as NewField } from '../new_field/';
import { INIT_ATTRS, NEW_ATTRS } from '../../../../constants/';
import { Upload, Loader } from '../../../common/';
import './style.scss';

export class CategoryEditComponent extends Component {

	componentWillMount() {
		let {routes, xform, xhttp, params} = this.props, { path } = routes[2];

		// 添加
		if (path === 'add') {
			xform.init({ attrs: INIT_ATTRS, new_attr: NEW_ATTRS });
		}

		// 编辑
		if (path === ':category_id/edit') {
			xhttp.detail('category', [params.category_id]).then(result => {
				xform.init(Object.assign({}, result, { new_attr: NEW_ATTRS }));
			});
		}
	}

	render() {
		let {xform, formData = { fields: [] }, routes, xhttp, category} = this.props;
		let pageStatus = routes[2].path === 'add' ? 'add' : 'edit';

		return (
			<Loader loading={category.fetching.detail} className="category-edit-page page ui form">
				<div className="basic sec">
					<h3 className="sec-title">品类信息</h3>
					<div className="photo">
						<Upload {...this.props}></Upload>
					</div>
					<div className="info">
						<div className="field inline">
							<label>名称</label>
							<input type="text" value={formData.name} onChange={xform.change.bind(this, 'name')} />
						</div>

						<div className="field inline">
							<label>缩写</label>
							<input type="text" value={formData.abbr} onChange={xform.change.bind(this, 'abbr')} />
						</div>

						<div className="field inline description">
							<label>简介</label>
							<input type="text" value={formData.description} onChange={xform.change.bind(this, 'description')} />
						</div>
					</div>
				</div>
				<div className="field-config sec">
					<h3 className="sec-title">字段配置</h3>
					<ol className="list">
						{formData.attrs ? formData.attrs.map((item, index) => (
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

				{formData.newAttrs ? (<NewField {...this.props}></NewField>) : ''}

				<div className="btn-group sec">
					<button className="ui button primary" onClick={this.createCategory.bind(this)}>保存</button>
					<button className="ui button red">取消</button>
				</div>
			</Loader>
		);
	}

	// 保存品类
	save() {
		let {xhttp, formData, history} = this.props;

	}


	// 保存品类
	createCategory() {
		let {xhttp, formData, history} = this.props;

		let newData = { name: formData.name, abbr: formData.abbr, attrs: formData.attrs, description: formData.description, photo: formData.photo };
		xhttp.create('category', [], newData, () => {
			history.pushState(null, '/category');
		});
	}

}

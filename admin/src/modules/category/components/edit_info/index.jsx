/**
 * 编辑详情组件
 */
import React from 'react';
import { Form } from 'semantic-ui-react';
import { reduxForm } from 'redux-form';
import './style.scss';

const categoryEditInfo = (props) => (
    <Form>

    </Form>
);

export const CategoryEditInfo = reduxForm({
    form: 'category_edit_info'
})(categoryEditInfo);




	// return (
	// 	<Loader className="category-edit-page page" loading={page === 'edit' && category.fetching}>
	// 		<div className="basic sec ui form">
	// 			<h3 className="sec-title">品类信息</h3>
	// 			<Upload {...this.props} className="cover"></Upload>
	// 			<div className="info">
	// 				<FormGroup label="名称">
	// 					<input type="text" value={formData.name} onChange={xform.change.bind(this, 'name')} />
	// 				</FormGroup>
	// 				<FormGroup label="缩写">
	// 					<input type="text" value={formData.abbr} onChange={xform.change.bind(this, 'abbr')} />
	// 				</FormGroup>
	// 				<FormGroup label="简介" className="description">
	// 					<input type="text" value={formData.description} onChange={xform.change.bind(this, 'description')} />
	// 				</FormGroup>
	// 			</div>
	// 		</div>
	// 		<div className="field-config sec ui form">
	// 			<h3 className="sec-title">字段配置</h3>
	// 			<ol className="list">
	// 				{formData.attrs ? formData.attrs.map((item, index) => (
	// 					<li key={index}>
	// 						<div>
	// 							<Field name="字段名" className="field-title">{item.title}</Field>
	// 							<Field name="必填" className="field-required">{item.attr_required ? '是' : '否'}</Field>
	// 						</div>
	// 						<div>
	// 							<Field name="数据名" className="field-key">{item.key}</Field>
	// 							<Field name="类型" className="field-type">{item.attr_type}</Field>
	// 						</div>
	// 					</li>
	// 				)) : ''}
	// 			</ol>
	// 		</div>

	// 		<div className="btn-group sec">
	// 			<button className="ui button primary" onClick={this.save.bind(this)}>保存</button>
	// 			<button className="ui button red">取消</button>
	// 		</div>
	// 	</Loader>
	// );
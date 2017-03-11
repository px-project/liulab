/**
 * 编辑模板组件
 */
import React from 'react';
import { CategoryEditInfo, CategoryEditFields } from '..';
import { Form, ButtonGroup, Button } from 'semantic-ui-react';
import { Sec } from '../../../common';
import { FieldArray, reduxForm } from 'redux-form';
import './style.scss';

// const CategoryEdit = ({ handleSubmit }) => (
// 	<Form className="category-edit">
// 		<Sec title="品类信息">
// 			<CategoryEditInfo></CategoryEditInfo>
// 		</Sec>
// 		<Sec title="字段配置">
// 			<FieldArray name="asdasd" component={CategoryEditFields}></FieldArray>
// 		</Sec>
// 		<ButtonGroup className="btn-group">
// 			<Button primary={true}>保存</Button>
// 			<Button>取消</Button>
// 		</ButtonGroup>
// 	</Form>
// );

const renderMember = ({ fields, meta: { error } }) => {
	setInterval(() => {

		console.log(fields);
		console.log(error);
	}, 1000);
	return (
		<ul>
			<li><button type="button" onClick={e => fields.push({ a: 1 })}>add</button></li>
			{fields.map(item => <li>{item.a}</li>)}
		</ul>
	);
}


const CategoryEdit = () => (
	<form>
		<FieldArray name="asdasd" component={renderMember} />
	</form>
)

export default reduxForm({
	form: 'category_edit'
})(CategoryEdit);
/**
 * 编辑模板组件
 */
import React from 'react';
import { CategoryEditInfo, CategoryEditFields } from '..';
import { Form, ButtonGroup, Button } from 'semantic-ui-react';
import { Sec } from '../../../common';
import { FieldArray, reduxForm } from 'redux-form';
import './style.scss';

@reduxForm({ form: 'category_edit' })
export class CategoryEdit extends React.Component {
	render() {
		const { handleSubmit } = this.props;
		return (
			<Form className="category-edit" onSubmit={handleSubmit}>
				<Sec title="品类信息">
					<CategoryEditInfo></CategoryEditInfo>
				</Sec>
				<Sec title="字段配置">
					<FieldArray name="attrs" component={CategoryEditFields}></FieldArray>
				</Sec>
				<ButtonGroup className="btn-group">
					<Button primary={true}>保存</Button>
					<Button>取消</Button>
				</ButtonGroup>
			</Form>
		);
	}
}
/**
 * 编辑模板组件
 */
import React from 'react';
import { CategoryEditField, CategoryEditInfo } from '..';
import { Form, ButtonGroup, Button, Table, Icon } from 'semantic-ui-react';
import { Sec } from '../../../common';
import './style.scss';

export const CategoryEditComponent = props => {
	let { category, handleSubmit, formData } = props, { category_edit } = formData;

	return (
		<Form className="category-edit">
			<Sec title="品类信息">
				<CategoryEditInfo></CategoryEditInfo>
			</Sec>
			<Sec title="字段配置">
				<Table>
					<Table.Header fullWidth>
						<Table.Row>
							<Table.HeaderCell></Table.HeaderCell>
							<Table.HeaderCell>字段名</Table.HeaderCell>
							<Table.HeaderCell>数据名</Table.HeaderCell>
							<Table.HeaderCell>字段类型</Table.HeaderCell>
							<Table.HeaderCell>是否必填</Table.HeaderCell>
							<Table.HeaderCell>操作</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{category_edit && category_edit.values.attrs.map((attr, index) => (
							<Table.Row key={index}>
								<Table.Cell>{index + 1}</Table.Cell>
								<Table.Cell>
									<span className="value">{attr.title}</span>
								</Table.Cell>
								<Table.Cell>
									<span className="value">{attr.key}</span>
								</Table.Cell>
								<Table.Cell>
									<span className="value">{attr.attr_type}</span>
								</Table.Cell>
								<Table.Cell>
									<span className="value">
										{attr.attr_required ? (<Icon name='checkmark' color="green" />) : (<Icon name='close' color="red" />)}
									</span>
								</Table.Cell>
								<Table.Cell>
									<a>编辑</a>
									<a>移除</a>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
					<Table.Footer fullWidth>
						<Table.Row>
							<Table.HeaderCell colSpan="6">
								<Button floated="right" color="teal" size="small">添加字段</Button>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			</Sec>
			<ButtonGroup className="btn-group">
				<Button primary={true}>保存</Button>
				<Button>取消</Button>
			</ButtonGroup>
		</Form>
	);
};
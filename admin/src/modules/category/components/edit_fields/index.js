
import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import { CategoryEditField } from '..';
import { INIT_ATTRS } from '../../constants';
import './style.scss';

export const CategoryEditFields = ({ fields }) => (
    <Table className="category-edit-fields">
        <Table.Header fullWidth>
            <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>字段名</Table.HeaderCell>
                <Table.HeaderCell>数据名</Table.HeaderCell>
                <Table.HeaderCell>字段类型</Table.HeaderCell>
                <Table.HeaderCell>是否必填</Table.HeaderCell>
                <Table.HeaderCell>操作</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {fields.map((field, index) => (
                <CategoryEditField field={field} index={index} key={index} disable={index < INIT_ATTRS.length} remove={fields.remove}></CategoryEditField>
            ))}
        </Table.Body>
        <Table.Footer fullWidth>
            <Table.Row>
                <Table.HeaderCell colSpan="6">
                    <Button type="button" floated="right" onClick={e => fields.push({})} color="teal" size="small">添加字段</Button>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    </Table>
);
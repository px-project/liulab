/**
 * 编辑字段组件
 */
import React from 'react';
import { Table, FormInput, FormSelect, FormCheckbox, Button, ButtonGroup } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { ATTR_TYPE } from '../../constants';
import './style.scss';

const InputValue = ({ input }) => (
    <p>{input.value}</p>
);

const SelectValue = ({ input }) => (
    <p>{ATTR_TYPE.filter(attr => attr.value === input.value)[0].text}</p>
);

const CheckValue = ({ input }) => (
    <p>{input.value ? '是' : '否'}</p>
);

export const CategoryEditField = ({ field, index, disable = false, remove }) => (
    <Table.Row key={index}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>
            <Field component={disable ? InputValue : FormInput} name={`${field}.title`}></Field>
        </Table.Cell>
        <Table.Cell>
            <Field component={disable ? InputValue : FormInput} name={`${field}.key`}></Field>
        </Table.Cell>
        <Table.Cell>
            <Field component={disable ? SelectValue : FormSelect} options={ATTR_TYPE} name={`${field}.attr_type`}></Field>
        </Table.Cell>
        <Table.Cell>
            <Field component={disable ? CheckValue : FormCheckbox} name={`${field}.attr_required`} toggle></Field>
        </Table.Cell>
        <Table.Cell>
            {!disable && <Button onClick={() => remove(index)}><i className="fa fa-remove"></i></Button>}
        </Table.Cell>
    </Table.Row>
)
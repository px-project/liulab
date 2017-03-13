/**
 * 编辑字段组件
 */
import React from 'react';
import { Table, FormInput, FormSelect, FormCheckbox, Button, ButtonGroup } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { ATTR_TYPE } from '../../constants';
import './style.scss';

export const CategoryEditField = ({ field, index }) => (
    <Table.Row key={index}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>
            <Field component={FormInput} block name={`${field}.title`}></Field>
        </Table.Cell>
        <Table.Cell>
            <Field component={FormInput} block name={`${field}.key`}></Field>
        </Table.Cell>
        <Table.Cell>
            <Field component={FormSelect} block options={ATTR_TYPE} name={`${field}.attr_type`}></Field>
        </Table.Cell>
        <Table.Cell>
            <Field component={FormCheckbox} name={`${field}.attr_required`} toggle></Field>
        </Table.Cell>
        <Table.Cell>
            <ButtonGroup>
                <Button><i className="fa fa-remove"></i></Button>
            </ButtonGroup>
        </Table.Cell>
    </Table.Row>
)
/**
 * 编辑字段组件
 */
import React from 'react';
import { Form, FormInput, FormSelect, FormGroup, FormCheckbox, ButtonGroup, Button } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { ATTR_TYPE } from '../../constants';
import './style.scss';

const categoryEditField = ({ field, save }) => (
    <FormGroup inline>
        <Field component={FormInput} label="字段名" name="title"></Field>
        <Field component={FormInput} label="数据名" name="key"></Field>
        <Field component={FormSelect} label="字段类型" options={ATTR_TYPE} name="attr_type"></Field>
        <Field component={FormCheckbox} label="必填" name="attr_required" toggle></Field>

        <ButtonGroup>
            <Button primary={true}><i className="fa fa-check"></i></Button>
            <Button><i className="fa fa-remove"></i></Button>
        </ButtonGroup>
    </FormGroup>
);

export const CategoryEditField = reduxForm({
    form: 'category_edit_field'
})(categoryEditField);
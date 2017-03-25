/**
 * 编辑角色
 */
import React from 'react';
import './style.scss';
import { reduxForm, Field } from 'redux-form';
import { Form, FormInput } from 'semantic-ui-react';

@reduxForm({
    form: 'role_edit',
})
export class RoleEdit extends React.Component {
    render() {
        return (
            <Form className="role-edit">
                <header className="header">
                    <Field component={FormInput} label="角色名称" name="name" inline={true}></Field>
                    <Field className="description" component={FormInput} label="备注" name="description" inline={true}></Field>
                </header>
                <div className="role-detail">
                </div>
            </Form>
        );
    }
}
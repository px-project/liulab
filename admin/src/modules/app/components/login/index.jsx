/**
 * 登录框组件
 */
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, FormGroup, FormInput, Button } from 'semantic-ui-react';
import './style.scss';

@reduxForm({ form: 'login_form' })
export class LoginForm extends React.Component {
    render() {
        let { handleSubmit, loading } = this.props;
        return (
            <Form className="login-form">
                <div className="logo">
                    <img src={ require('../../../../public/images/logo.png') } />
                </div>
                <FormGroup>
                    <Field name="username" component={ FormInput } placeholder="请输入用户名"></Field>
                </FormGroup>
                <FormGroup>
                    <Field name="password" component={ FormInput } type="password" placeholder="请输入密码"></Field>
                </FormGroup>
                <Button disabled={ loading } onClick={ handleSubmit } type="button" primary={ true }>登录</Button>
            </Form>
        );
    }
}
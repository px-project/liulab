/**
 * 编辑角色
 */
import React from 'react';
import './style.scss';
import { reduxForm, Field } from 'redux-form';
import { Form, FormInput, ButtonGroup, Button } from 'semantic-ui-react';
import { PERMISSION_CONFIG } from '../../constants';
import { Link } from 'react-router-dom';

@reduxForm({
    form: 'role_edit',
})
export class RoleEdit extends React.Component {
    render() {
        return (
            <Form className="role-edit">
                <header className="header">
                    <Field component={ FormInput } label="角色名称" name="name" inline={ true }></Field>
                    <Field className="description" component={ FormInput } label="备注" name="description" inline={ true }></Field>
                </header>
                <div className="role-detail">
                    { Object.keys(PERMISSION_CONFIG).map((group, group_index) => (
                        <div>
                            <h5>{ PERMISSION_CONFIG[group].title }</h5>
                            <ul>
                                { PERMISSION_CONFIG[group].actions.map((action, action_index) => (
                                    <li key={ action_index }>
                                        <a>{ action.title }</a>
                                    </li>
                                )) }
                            </ul>
                        </div>
                    )) }
                </div>
                <footer className="footer">
                    <ButtonGroup>
                        <Button color="primary">保存</Button>
                        <Button color="red"><Link to="/role">取消</Link></Button>
                    </ButtonGroup>
                </footer>
            </Form>
        );
    }
}
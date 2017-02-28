/**
 * 编辑用户
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Upload, Loader } from '../../../common/';
import { Form } from 'semantic-ui-react';
import './style.scss';
const {Field, Select, Input} = Form;

export class UserEditComponent extends Component {

    render() {
        let {role, entities, xform, params, formData, user} = this.props;
        let {user_id} = params;

        return (
            <Loader loading={user.fetching} className="user-edit-page page">
                <Form>
                    <div className="avatar">
                        <Upload filename={formData.avatar} circle={true} fileKey="avatar" {...this.props}></Upload>
                    </div>

                    <Field options={role.items.map((role_id, role_index) => ({ key: role_index, text: entities[role_id].name, value: role_id }))}
                        label="角色" control={Select} onChange={(e, {value}) => xform.change('role', value)}></Field>
                    <Field label="姓名" control={Input} type="text" onChange={xform.change.bind(this, 'name')}></Field>
                    <Field label="账号" control={Input} type="text" onChange={xform.change.bind(this, 'username')}></Field>
                    <Field label="密码" control={Input} type="password" onChange={xform.change.bind(this, 'password')}></Field>
                    <Field label="确认密码" control={Input} type="password" onChange={xform.change.bind(this, 'pwdrepeat')}></Field>
                    <Field label="联系方式" control={Input} type="text" onChange={xform.change.bind(this, 'phone')}></Field>

                    <div className="btn-group">
                        <button className="ui button primary">确认</button>
                        <Link className="ui button red" to={'/user'}>取消</Link>
                    </div>

                </Form>
            </Loader>
        );
    }
}
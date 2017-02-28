/**
 * 编辑用户
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Upload, FormSelect, FormGroup, FormInput, Loader } from '../../../common/';
import './style.scss';

export class UserEditComponent extends Component {

    render() {
        let {role, entities, xform, params, formData, user} = this.props;
        let {user_id} = params;

        return (
            <div className="user-edit">
                <Loader loading={user.fetching}>
                    <div className="avatar">
                        <Upload filename={formData.avatar} circle={true} fileKey="avatar" {...this.props}></Upload>
                    </div>

                    <FormGroup label="角色">
                        <FormSelect className="category group" placeholder="请选择角色">
                            {role.items.map((role_id, role_index) => (
                                <option key={role_index} value={role_id}>{entities[role_id].name}</option>
                            ))}
                        </FormSelect>
                    </FormGroup>

                    <FormGroup label="姓名">
                        <input type="text" value={formData.name} onChange={xform.change.bind('name')} />
                    </FormGroup>

                    <FormGroup label="账号">
                        <input type="text" value={formData.username} onChange={this.fieldChange.bind(this, xform, 'username')} />
                    </FormGroup>
                </Loader>

                {!user_id || entities[user_id] ? (
                    <div className="ui form">

                        <div className="form-group field">
                            <label>姓名</label>
                        </div>
                        <div className="form-group field">
                            <label>角色</label>
                        </div>
                        <div className="form-group field">
                            <label>账号</label>
                            <input type="text" value={formData.username} onChange={this.fieldChange.bind(this, xform, 'username')} />
                        </div>
                        <div className="form-group field">
                            <label>密码</label>
                            <input type="password" onChange={this.fieldChange.bind(this, xform, 'password')} />
                        </div>
                        <div className="form-group field">
                            <label>确认密码</label>
                            <input type="password" onChange={this.fieldChange.bind(this, xform, 'pwdrepeat')} />
                        </div>
                        <div className="form-group field">
                            <label>联系方式</label>
                            <input type="text" value={formData.phone} onChange={this.fieldChange.bind(this, xform, 'phone')} />
                        </div>
                        <div className="btn-group">
                            <button className="ui button primary" onClick={this.save.bind(this, { user_id }, formData)}>确认</button>
                            <Link className="ui button red" to={'/user'}>取消</Link>
                        </div>
                    </div>) : ''}
            </div>)
    }

    // 表单变动
    fieldChange(xform, field, e) {
        xform(e.target.value, field);
    }

    // 保存
    save(option, data, e) {
        e.target.disabled = true;
        let {xhttp, history} = this.props;

        if (option.user_id) {
            this.updateUserDetail(option.user_id, data, result => {
                history.pushState(null, '/user');
            });
        } else {
            this.createUserDetail(data, result => {
                history.pushState(null, '/user');
            });
        }
    }
}

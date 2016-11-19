/**
 * 编辑用户
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.scss';
let avatar = require('../../../public/images/huluwa.jpg');

export class UserEditComponent extends Component {
    componentWillMount() {
        let {xhttp, xform, params} = this.props;
        let {user_id} = params;

        this.getRoleList(result => {
            if (user_id) {
                this.getUserDetail(user_id, (result) => {
                    xform(result);
                });
            } else {
                xform({});
            }
        });
    }

    componentDidMount() {
        $('select.dropdown').dropdown();
    }


    uploadAvatar (e) {
		let {xhttp,xform} = this.props;
		let file = e.target.files[0];
		let reqData = new FormData();
		reqData.append('file', file);
		xhttp({
			action: 'create',
			api: 'resource',
			reload: true,
			data: reqData
		}, result => {
            console.log(result);
            // this.
		});
    }



    render() {
        let {role, entities, xform, params, formData} = this.props;
        let {user_id} = params;

        return (
            <div className="user-edit">
                {!user_id || entities[user_id] ? (
                    <div className="ui form">
                        <div className="avatar">
                            <a>
                                <img src={avatar} />
                                <i className="fa fa-upload"></i>
                                <input ref="fileupload" type="file" onChange={this.uploadAvatar.bind(this)}/>
                            </a>
                        </div>

                        <div className="form-group field">
                            <label>姓名</label>
                            <input type="text" value={formData.name} onChange={this.fieldChange.bind(this, xform, 'name')} />
                        </div>
                        <div className="form-group field">
                            <label>角色</label>
                            <select className="ui fluid dropdown" value={formData.role_id} onChange={this.fieldChange.bind(this, xform, 'role')}>
                                <option value="">请选择角色</option>
                                {role.items.map((item, index) => (
                                    <option value={item} key={index}>{entities[item].name}</option>
                                ))}
                            </select>
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


    // 获取用户详情
    getUserDetail(user_id, cb) {
        this.props.xhttp({ action: 'detail', api: 'user', params: [user_id] }, (result) => {
            cb(result);
        });
    }

    // 获取角色角色列表
    getRoleList(cb) {
        this.props.xhttp({ action: 'list', api: 'role' }, (result) => {
            cb(result);
        });
    }

    // 更新用户信息
    updateUserDetail(user_id, data, cb) {
        this.props.xhttp({ action: 'update', api: 'user', params: [user_id], data }, (result) => {
            cb(result);
        });
    }

    // 创建用户信息
    createUserDetail(data, cb) {
        this.props.xhttp({ action: 'create', api: 'user', data }, (result) => {
            cb(result);
        });
    }
}

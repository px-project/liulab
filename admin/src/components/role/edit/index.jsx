/**
 * 权限修改
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import classname from 'classname';
import './style.scss';

export class RoleEditComponent extends Component {
    componentWillMount() {
        let {xhttp, routes, params, role, entities, permission, xform} = this.props;
        let status = routes[2].path === 'add' ? 'add' : 'edit';
        let role_id = params.role_id;

        if (status === 'add' && !permission.items.length) {
            this.getPermission(xhttp, (result) => {
                xform({ name: '', describe: '', permission: result.config });
            });
        }

        if (status === 'edit') {
            this.getRoleDetail(xhttp, role_id, (result) => {
                xform(result);
            });
        }
    }

    componentDidUpdate() {
        $('.ui.checkbox').checkbox();
    }

    render() {
        let {entities, xhttp, xform, formData, routes} = this.props;
        let status = routes[2].path === 'add' ? 'add' : 'edit';

        return (
            <div className="role-edit ui form">
                {formData ? (
                    <div>
                        <div className="info">
                            <div className="name field inline">
                                <label>角色名称</label>
                                {status === 'add' ? (
                                    <input type="text" value={formData.name} onChange={this.handleChange.bind(this.xform, 'name')} />
                                ) : ''}
                                {status === 'edit' ? (<p>{formData.name}</p>) : ''}
                            </div>

                            <div className="describe field inline">
                                <label>备注</label>
                                <input type="text" value={formData.describe} onChange={this.handleChange.bind(this.xform, 'describe')} />
                            </div>
                        </div>

                        <div className="permission">
                            {formData.permission && formData.permission.map((module, module_index) => (
                                <ul key={module_index} className="module">
                                    <li className={classname({ checked: module.allow }) + ' checkbox'}><a>{module.name}</a></li>
                                    {module.actions.map((action, action_index) => (
                                        <li key={action_index} className={classname({ checked: action.allow }) + ' checkbox'}><a>{action.name}</a></li>
                                    ))}
                                </ul>
                            ))}
                        </div>

                        <div className="btn-group">
                            <button className="ui button primary" onClick={this.save.bind(this, this.props)}>保存</button>
                            <Link className="ui button red" to={'/role'}>取消</Link>
                        </div>
                    </div>
                ) : ''}
            </div>
        );
    }

    // 处理表单元素变动
    handleChange(xform, field, e) {
        if (e.target.type === 'checkbox') {
            xform(e.target.checked, field);
        } else if (e.target.type === 'text') {
            xform(e.target.value, field);
        }
    }

    // 保存权限数据
    save(props, e) {
        e.target.disabled = true;
        let {xform, xhttp, formData, params, routes} = props;
        let status = routes[2].path === 'add' ? 'add' : 'edit';
        let role_id = params.role_id;

        if (status === 'add') {
            this.createRole(xhttp, formData, (result) => {
                props.history.pushState(null, '/role/' + result._id);
            });
        } else if (status === 'edit') {
            this.updateRole(xhttp, role_id, formData, (result) => {
                props.history.pushState(null, '/role/' + result._id);
            });
        }
    }


    // 创建角色
    createRole(xhttp, newData, cb) {
        xhttp({ action: 'create', api: 'role', data: newData }, result => cb(result));
    }

    // 更新角色
    updateRole(xhttp, role_id, newData, cb) {
        xhttp({ action: 'update', api: 'role', params: [role_id], data: newData }, result => cb(result));
    }

    // 获取角色详情
    getRoleDetail(xhttp, role_id, cb) {
        xhttp({ action: 'detail', api: 'role', params: [role_id] }, result => cb(result));
    }

    // 获取初始权限配置
    getPermission(xhttp, cb) {
        xhttp({ action: 'detail', api: 'permission' }, result => cb(result));
    }
}
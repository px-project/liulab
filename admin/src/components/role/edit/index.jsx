/**
 * 权限修改
 */
import React, { Component } from 'react';
import './style.scss';

export class RoleEditComponent extends Component {
    componentWillMount() {
        let {xhttp, routes, params, role, entities, permission, xform} = this.props;
        let status = routes[2].path === 'add' ? 'add' : 'edit';
        let role_id = params.role_id;

        if (status === 'edit' && !entities[role_id]) {
            this.getRoleDetail(xhttp);
        }

        if (status === 'add' && !permission.items.length) {
            this.getPermission(xhttp, (result) => {
                xform({
                    name: '',
                    permission: result.config
                });
            });
        }
    }


    render() {
        let {entities, xhttp, xform, formData} = this.props;
        return (
            <div className="role-edit">
                <div className="name">
                    <label>角色名</label>
                    <input type="text" onChange={this.handleChange.bind(this, xform, 'name')} />
                </div>

                <div className="permission">
                    {formData.permission && formData.permission.modules.map((module, module_index) => (
                        <div key={module_index} className="module">
                            <header>
                                <label><input type="checkbox" checked={module.allow} onChange={this.handleChange.bind(this, xform, `permission.modules.${module_index}.allow`)} /> {module.name}</label>
                            </header>

                            <div className="actions">
                                {formData.permission[module.key].map((action, action_index) => (
                                    <div key={action_index} className="action">
                                        <label><input type="checkbox" checked={action.allow} onChange={this.handleChange.bind(this, xform, `permission.${module.key}.${action_index}.allow`)} /> {action.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="btn-group">
                    <button className="ui button primary" onClick={this.save.bind(this, this.props)}>保存</button>
                </div>
            </div>
        );
    }

    // 处理表单元素变动
    handleChange(xform, field, e) {
        console.log(e.target.type)
        if (e.target.type === 'checkbox') {
            xform(e.target.checked, field);
        } else if (e.target.type === 'text') {
            xform(e.target.value, field);
        }
    }

    // 保存权限数据
    save(props, e) {
        e.target.disabled = true;
        let {xform, xhttp, formData, routes} = props;

        xhttp({ action: 'create', api: 'role', data: formData }, (result) => {
            props.history.pushState(null, '/role');
        });
    }


    // 获取角色详情
    getRoleDetail(xhttp, role_id) {
        xhttp({ action: 'detail', api: 'role', params: [role_id] });
    }

    // 获取初始权限配置
    getPermission(xhttp, cb) {
        xhttp({ action: 'detail', api: 'permission' }, (result) => {
            cb(result);
        });
    }
}
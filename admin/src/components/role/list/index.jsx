/**
 * 权限列表
 */
import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import './style.scss';

export class RoleListComponent extends Component {
    componentWillMount() {
        let {xhttp} = this.props;

        // 获取角色列表
        this.getRoleList(xhttp);
    }

    render() {
        let {entities, role} = this.props;

        return (
            <aside className="role-list">
                <ul>
                    {role.items.map((role_id, role_index) => (
                        <li key={role_index}>
                            <Link to={`/role/${role_id}/edit`}>{entities[role_id].name}</Link>
                        </li>
                    ))}
                </ul>
            </aside>
        )
    }

    // 获取角色列表
    getRoleList(xhttp) {
        xhttp({ action: 'list', api: 'role' });
    }
}
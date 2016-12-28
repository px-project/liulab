/**
 * 权限列表
 */
import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import classname from 'classname';
import './style.scss';

export class RoleListComponent extends Component {
    componentWillMount() {
        let {xhttp} = this.props;
        xhttp.list('role');
    }

    render() {
        let {entities, role, params} = this.props;

        return (
            <aside className="role-list">
                <ul>
                    {role.items.map((role_id, role_index) => (
                        <li key={role_index} className={classname({ active: role_id === params.role_id })}>
                            <Link to={`/role/${role_id}/edit`}>{entities[role_id].name}</Link>
                        </li>
                    ))}
                </ul>
            </aside>
        )
    }
}
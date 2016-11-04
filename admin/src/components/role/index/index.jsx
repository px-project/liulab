/**
 * 权限首页
 */
import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import './style.scss';

export class RoleComponent extends Component {
    componentWillMount() {
    }

    render() {

        return (
            <div className="role-index">
                <Link to={'/role/add'}>添加角色</Link>
            </div>
        );
    }
}
/**
 * 权限首页
 */
import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import './style.scss';

export class RoleComponent extends Component {
    componentWillMount() {
        let {xhttp} = this.props;

        // 获取角色列表
        this.getRoleList(xhttp);
    }

    render() {
        let {entities, role} = this.props;


        return (
            <div className="role-page">
                <header className="list-header">
                    <Link className="ui button primary" to="/role/add">添加</Link>
                </header>
                <table className="ui table">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>角色</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>

                    <tbody>
                        {role.items.length && role.items.map((role_id, role_index) => (
                            <tr key={role_index}>
                                <td>{role_index + 1}</td>
                                <td>{entities[role_id].name}</td>
                                <td>{moment(entities[role_id].create_time).format('YYYY-MM-DD hh:mm:ss')}</td>
                                <td>
                                    <Link to={'/role/' + role_id}>详情</Link>
                                    <Link to={'/role/' + role_id + '/edit'}>编辑</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    // 获取角色列表
    getRoleList(xhttp) {
        xhttp({ action: 'list', api: 'role' });
    }
}
/**
 * 权限修改
 */
import React, { Component } from 'react';
import './style.scss';

export class RoleEditComponent extends Component {
    componentWillMount () {
        let {routes, params, role, entities} = this.props;
        let status = routes[2].path === 'add' ? 'add' : 'edit';

        let role_id = params.role_id;

        if (status === 'edit' && !entities[role_id]) {
            this.getRoleDetail(xhttp);
        }
    }


    render() {
        return (
            <div>
            
            </div>   
        );
    }


    // 获取角色详情
    getRoleDetail (xhttp, role_id) {
        xhttp({action: 'detail', api: 'role', params: [role_id]});
    }
}
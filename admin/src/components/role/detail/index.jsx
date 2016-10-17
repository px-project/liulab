/**
 * 权限详情
 */
import React, { Component } from 'react';
import './style.scss';

export class RoleDetailComponent extends Component {
    componentWillMount () {
        let {routes, xhttp, params, role, entities} = this.props;
        let role_id = params.role_id;

        if (!entities[role_id]) {
            this.getRoleDetail(xhttp, role_id);
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
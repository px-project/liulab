/**
 * 权限首页
 */
import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { RoleListComponent as RoleList, RoleDetailComponent as RoleDetail } from '../index.js';
import './style.scss';

export class RoleComponent extends Component {
    componentWillMount() {
        this.props.xhttp.list('role');
    }

    render() {
        let {role, entities} = this.props;

        return (
            <div className="role-page page">
                <RoleList {...this.props}></RoleList>
            </div>
        );
    }
}
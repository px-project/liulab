/**
 * 权限首页
 */
import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import './style.scss';

export class RoleComponent extends Component {
    componentWillMount() {
        this.props.xhttp({action: 'list', api: 'role'});
    }

    render() {
        let {role, entities} = this.props;

        return (
            <div className="role-page page">
                <aside>
                    1111
                </aside>
            </div>
        );
    }
}
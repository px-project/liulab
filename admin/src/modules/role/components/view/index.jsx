/**
 * 查看角色详情
 */
import React from 'react';
import './style.scss';
import { Field } from '../../../common';
import { PERMISSION_CONFIG } from '../../constants';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button } from 'semantic-ui-react';

export const RoleView = ({ role }) => (
    <div className="role-view">
        <header className="header">
            <Field name="名称">{ role.name }</Field>
            <Field name="描述">{ role.description }</Field>
            <Link className="button ui primary" to={ `/role/${role._id}/edit` }>编辑</Link>
        </header>
        <div className="role-detail">
            { Object.keys(PERMISSION_CONFIG).map((group, group_index) => (
                <div className="role-group" key={ group_index }>
                    <h5>{ PERMISSION_CONFIG[group].title }</h5>
                    <ul>
                        { PERMISSION_CONFIG[group].actions.map((action, action_index) => (
                            <li key={ action_index }>{ action.title }</li>
                        )) }
                    </ul>
                </div>
            )) }
        </div>
    </div>
);
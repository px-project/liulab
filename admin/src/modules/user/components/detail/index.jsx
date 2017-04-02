/**
 * user detail component.
 */
import React from 'react';
import { Field, UserAvatar, Loader } from '../../../common';
import { Link } from 'react-router-dom';
import './style.scss';

export const UserDetail = ({ detail = {} }) => (
    <div className="user-detail">
        <header className="page-header">
            <Link className="button ui primary" to={ `/user/${detail._id}/edit` }>编辑</Link>
        </header>
        <div className="user-info">
            <UserAvatar></UserAvatar>
            <Field name="角色">{ detail.role.name || '-' }</Field>
            <Field name="姓名">{ detail.name || '-' }</Field>
            <Field name="账号">{ detail.username || '-' }</Field>
            <Field name="联系方式">{ detail.phone || '-' }</Field>
        </div>
    </div>
);
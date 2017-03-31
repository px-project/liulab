/**
 * user detail component.
 */
import React from 'react';
import { Field, UserAvatar, Loader } from '../../../common';
import './style.scss';

export const UserDetail = ({ user = {} }) => (
    <div className="user-detail">
        <UserAvatar></UserAvatar>
        <Field name="角色">{ user.role }</Field>
        <Field name="姓名">{ user.name }</Field>
        <Field name="账号">{ user.username }</Field>
        <Field name="联系方式">{ user.phone }</Field>
    </div>
);
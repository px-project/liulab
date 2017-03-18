/**
 * user detail component.
 */
import React from 'react';
import { Field, UserAvatar, Loader } from '../../../common';
import './style.scss';

export const UserDetail = ({ entities, user }) => (
    <Loader loading={user.fetching} className="user-detail">
        <UserAvatar></UserAvatar>
        <Field name="角色">{entities[user.detail].role}</Field>
        <Field name="姓名">{entities[user.detail].name}</Field>
        <Field name="账号">{entities[user.detail].username}</Field>
        <Field name="联系方式">{entities[user.detail].phone}</Field>
    </Loader>
);
/**
 * 用户路由
 */
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserContainer, UserAddContainer, UserEditContainer, UserDetailContainer } from '../containers';

export const UserRouter = (
    <Route path="user" name="用户" icon="users" key="user">
        <IndexRoute component={UserContainer}></IndexRoute>
        <Route path="add" name="新用户" component={UserAddContainer}></Route>
        <Route path=":user_id/edit" name="编辑用户" component={UserEditContainer}></Route>
        <Route path=":user_id" name="用户详情" component={UserDetailContainer}></Route>
    </Route>
);
/**
 * 用户路由
 */
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserIndexPage, UserAddPage, UserEditPage, UserDetailPage } from '../pages';

export const UserRouter = (
    <Route path="user" name="用户" icon="users" key="user">
        <IndexRoute component={UserIndexPage}></IndexRoute>
        <Route path="add" name="新用户" component={UserAddPage}></Route>
        <Route path=":user_id/edit" name="编辑用户" component={UserEditPage}></Route>
        <Route path=":user_id" name="用户详情" component={UserDetailPage}></Route>
    </Route>
);
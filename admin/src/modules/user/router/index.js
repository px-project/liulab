/**
 * 用户路由
 */
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserContainer } from '../containers';

export const UserRouter = (
    <Route path="/user" name="用户" icon="users" key="user">
        <IndexRoute component={UserContainer}></IndexRoute>
    </Route>
);
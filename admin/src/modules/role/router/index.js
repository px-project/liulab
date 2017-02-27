/**
 * 角色路由
 */
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { RoleContainer } from '../containers';

export const RoleRouter = (
    <Route path="/role" name="角色" icon="cog" key="role">
        <IndexRoute component={RoleContainer}></IndexRoute>
    </Route>
);

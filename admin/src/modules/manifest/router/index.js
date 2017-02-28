/**
 * 货单路由
 */
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { ManifestContainer, ManifestDetailContainer } from '../containers';

export const ManifestRouter = (
    <Route name="货单" path="manifest" icon="truck" key="manifest">
        <IndexRoute component={ManifestContainer}></IndexRoute>
        <Route name="货单详情" path=":manifest_id" component={ManifestDetailContainer}></Route>
    </Route>
);
/**
 * 订单路由
 */
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { OrderContainer, OrderDetailContainer } from '../containers';

export const OrderRouter = (
    <Route path="order" name="订单" icon="file text outline" key="order">
        <IndexRoute component={OrderContainer}></IndexRoute>
        <Route name="订单详情" path=":order_id" component={OrderDetailContainer}></Route>
    </Route>
);
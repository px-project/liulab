/**
 * 产品路由
 */
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { ProductContainer } from '../containers';

export const ProductRouter = (
    <Route path="product" name="产品" icon="product-hunt" key="product">
        <IndexRoute component={ProductContainer}></IndexRoute>
    </Route>
);
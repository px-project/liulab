/**
 * 产品路由
 */
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { ProductContainer, ProductAddContaner, ProductEditContainer, ProductDetailContainer } from '../containers';

export const ProductRouter = (
    <Route path="product" name="产品" icon="product-hunt" key="product">
        <IndexRoute component={ProductContainer}></IndexRoute>
        <Route name="添加产品" path="add" component={ProductAddContaner}></Route>
        <Route name="编辑产品" path=":product_id/edit" component={ProductEditContainer}></Route>
        <Route name="产品详情" path=":product_id" component={ProductDetailContainer}></Route>
    </Route>
);
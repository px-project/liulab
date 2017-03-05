/**
 * 品类路由
 */
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { CategoryIndexPage, CategoryAddPage, CategoryDetailPage, CategoryEditPage } from '../pages';

export const CategoryRouter = (
    <Route path="category" name="品类" key="category" icon="book">
        <IndexRoute component={CategoryIndexPage}></IndexRoute>
        <Route path="add" name="新品类" component={CategoryAddPage}></Route>
        <Route path=":category_id" name="详情" component={CategoryDetailPage}></Route>
        <Route path=":category_id/edit" name="编辑" component={CategoryEditPage}></Route>
    </Route>
);
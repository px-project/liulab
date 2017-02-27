/**
 * 品类路由
 */
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { CategoryContainer, CategoryAddContainer, CategoryDetailContainer, CategoryEditContainer } from '../containers';

export const CategoryRouter = (
    <Route path="category" name="品类" key="category" icon="book">
        <IndexRoute component={CategoryContainer}></IndexRoute>
        <Route path="add" component={CategoryAddContainer}></Route>
        <Route path=":category_id" component={CategoryDetailContainer}></Route>
        <Route path=":category_id/edit" component={CategoryEditContainer}></Route>
    </Route>
);
/**
 * 首页路由
 */
import React, { Component } from 'react';
// import { Route, IndexRoute } from 'react-router';
import { Route } from 'react-router';
import { IndexContainer } from '../containers';

export const IndexRouter = (
    <Route name="首页" path="index" icon="home" key="index" exact component={IndexContainer}></Route>
);
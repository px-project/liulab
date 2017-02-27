/**
 * book module router.
 */
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { BookContainer } from '../containers';

export const BookRouter = (
    <Route name="订购" path="/book" icon="shopping-bag" key="book">
        <IndexRoute component={BookContainer}></IndexRoute>
    </Route>
);
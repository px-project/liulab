/**
 * book module router.
 */
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { BookContainer, BookUploadContainer, BookConfirmContainer } from '../containers';

export const BookRouter = (
    <Route name="订购" path="book" icon="shopping-bag" key="book">
        <IndexRoute component={BookContainer}></IndexRoute>
        <Route name="批量上传" path="upload" component={BookUploadContainer}></Route>
        <Route name="确认订单" path="confirm" component={BookConfirmContainer}></Route>
    </Route>
);
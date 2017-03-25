/**
 * 项目入口文件
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './modules/app/pages';
import configureStore from './store/';

let store = configureStore();

const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    rootElement
);


/**
 * 项目入口文件
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './modules/app/router';
import configureStore from './store/';

let store = configureStore();

const rootElement = document.getElementById('app');


render(
    <Provider store={store}>
    	<Routes />
    </Provider>,
    rootElement
);


/**
 * 项目入口文件
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes/';
import configureStore from './store/';

// polyfill
import 'babel-polyfill';


let store = configureStore();

console.log(store.getState());


const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
    	<Routes />
    </Provider>,
    rootElement
);

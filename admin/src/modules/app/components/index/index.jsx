/**
 * app 组件
 */
import React from 'react';
import { Header, Sidebar } from '..';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './style.scss';
import { IndexContainer } from '../../../index/containers';
import { CategoryContainer } from '../../../category/containers';
import { AppRouter } from '../../router';

export class AppComponent extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Sidebar {...this.props}></Sidebar>
                    <div id="main">
                        <Header {...this.props}></Header>
                        <AppRouter></AppRouter>
                    </div>
                </div>
            </Router>
        );
    }
}



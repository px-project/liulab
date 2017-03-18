/**
 * app 组件
 */
import React from 'react';
import { Header, Sidebar } from '..';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from '../../router';
import './style.scss';

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



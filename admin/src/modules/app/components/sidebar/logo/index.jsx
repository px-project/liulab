/**
 * 侧边栏logo组件
 */
import React, { Component } from 'react';
import logo from '../../../../../public/images/logo.png';
import './style.scss';

export class AppSidebarLogoComponent extends Component {
    render() {
        return (
            <div className="app-sidebar-logo">
                <div className="logo">
                    {/*<img src={logo}/>*/}
                </div>
            </div>
        );
    }
}
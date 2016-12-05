/**
 * app 组件
 */
import React, { Component } from 'react';
import {Header, Sidebar} from '../';
import './style.scss';

export class AppComponent extends Component {
    componentWillMount () {
        this.props.xhttp({
            action: 'detail',
            api: 'userCurrent'
        });
    }

    render() {
        return (
            <div className="container">
                <Sidebar {...this.props}></Sidebar>
                <div id="main">
                    <Header {...this.props}></Header>
                    <div className="views">
                        {React.cloneElement(this.props.children, this.props)}
                    </div>
                </div>
            </div>
        );
    }
}
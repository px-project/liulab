/**
 * 区域组件
 */
import React, { Component } from 'react';
import './style.scss';

export class SecComponent extends Component {
    render() {
        let {children, title} = this.props;
        return (
            <div className="l-sec">
                <h5 className="l-sec-title">{title}</h5>
                <div className="cont">
                    {children}
                </div>
            </div>
        );
    }
}
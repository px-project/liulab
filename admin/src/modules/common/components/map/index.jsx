/**
 * 内容组件
 */
import React, { Component } from 'react';
import './style.scss';

export class MapComponent extends Component {
    render() {
        let {title, children, className} = this.props;
        return (
            <p className={`l-map ${className}`}>
                <span className="title">{title}</span>
                <span className="value">{children}</span>
            </p>
        );
    }
}
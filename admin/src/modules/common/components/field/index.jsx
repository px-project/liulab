/**
 * 字段
 */
import React, { Component } from 'react';
import './style.scss';

export class FieldComponent extends Component {
    render() {
        let {name, children} = this.props;
        return (
            <div className="l-field">
                <label>{name}</label>
                <span className="value">{children}</span>
            </div>
        );
    }
}
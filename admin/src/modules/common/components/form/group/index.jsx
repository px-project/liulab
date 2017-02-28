/**
 * 通用表单表单控件组合组件
 */
import React, { Component } from 'react';
import classname from 'classname';
import './style.scss';

export class FormGroup extends Component {

    render() {
        let {children, label, className} = this.props;

        return (
            <div className={`l-form-group field inline ${className} ${classname({})}`}>
                {label ? (<label>{label}</label>) : ''}
                {children}
            </div>
        );
    }
}
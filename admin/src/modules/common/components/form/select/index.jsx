/**
 * 表单选择组件
 */
import React, { Component } from 'react';
import './style.scss';

export class FormSelect extends Component {

    componentDidUpdate() {
        $(this.refs.dropdown).dropdown();
    }

    render() {
        let { className, value, onChange, empty = false, placeholder, children } = this.props;

        return (
            <div className={ `l-form-select ${className}` }>
                <select className="ui dropdown" ref="dropdown" value={ value } onChange={ onChange }>
                    { empty ? (<option value="">{ placeholder }</option>) : '' }
                    { children }
                </select>
            </div>
        );
    }
}
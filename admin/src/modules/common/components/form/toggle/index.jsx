/**
 * 开关组件
 */
import React, { Component } from 'react';
import './style.scss';

export class FormToggle extends Component {

    componentDidUpdate() {
        $(this.refs.checkbox).checkbox();
    }

    render() {
        let {value, onChange, className = ''} = this.props;
        return (
            <div className={`l-form-toggle ui toggle checkbox ${className}`}>
                <input type="checkbox" ref="checkbox" value={value} onChange={onChange} />
                <label></label>
            </div>
        );
    }
}
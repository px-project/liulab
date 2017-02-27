/**
 * 表单选择组件
 */
import React, { Component } from 'react';
import './style.scss';

export class FormSelectComponent extends Component {

    componentDidUpdate() {
        $(this.refs.dropdown).dropdown();
    }

    render() {
        let {className, value, onChange, data, empty = false, placeholder, til, val} = this.props;

        return (
            <div className={`l-form-select ${className}`}>
                <select className="ui dropdown" ref="dropdown" value={formData.newField.attr_type} onChange={onChange}>
                    <option value="">{placeholder}</option>

                </select>
            </div>
        );
    }
}
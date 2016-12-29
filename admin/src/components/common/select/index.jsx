/**
 * 选择下拉框组件
 */
import React, { Component } from 'react';
import './style.scss';

export class SelectComponent extends Component {
    componentDidUpdate() {
        $(this.refs.dropdown).dropdown();
    }

    render() {
        let {placeholder = '', value = '', empty = false, className = '', change = () => { } } = this.props;
        return (
            <div className={className}>
                <select className="ui selection dropdown" ref="dropdown" value={value} onChange={this.handleSelect.bind(this)}>
                    {empty ? (
                        <option value="">{placeholder}</option>
                    ) : ''}
                    {this.props.children}
                </select>
            </div>
        );
    }

    // handle select
    handleSelect(e) {
        let {change = () => { } } = this.props;
        change(e.target.value);
    }
}
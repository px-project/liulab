/**
 * 搜索组件
 */
import React, { Component } from 'react';
import './style.scss';

export class Search extends Component {
    render() {
        let {classname} = this.props;
        return (
            <div className={`ui search ${classname}`}>
                <div className="ui icon input">
                    <input className="prompt" type="text" placeholder="" />
                    <i className="search icon"></i>
                </div>
            </div>
        );
    }
}
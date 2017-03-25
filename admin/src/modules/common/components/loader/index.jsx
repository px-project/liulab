/**
 * 加载器
 */
import React, { Component } from 'react';
import './style.scss';

export class Loader extends Component {
    render() {
        let { loading = true, data, className = '', children } = this.props, empty = this.isEmpty(data);

        return (
            <div className={'loader ' + className}>

                {loading ? (
                    <div className="loading">加载中</div>
                ) : ''}

                {!loading && empty ? (
                    <div className="empty">暂无数据</div>
                ) : ''}

                {!loading && !empty ? children : ''}

            </div>
        );
    }

    isEmpty(data) {
        if (data === undefined) return false;
        if (!data) return true;
        if (Array.isArray(data) && !data.length) return true;
        if (typeof data === 'object' && !Object.keys(data).length) return true;
        return false;
    }
}

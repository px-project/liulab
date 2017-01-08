/**
 * 加载器
 */
import React, { Component } from 'react';
import './style.scss';

export class LoaderComponent extends Component {
    render() {
        let {loading = true, data, className} = this.props;
        let empty = isEmpty(data);

        return (
            <div className={'loader ' + className}>

                {loading ? (
                    <div className="loading">加载中</div>
                ) : ''}

                {!loading && empty ? (
                    <div className="empty">暂无数据</div>
                ) : ''}

                {!loading && !empty ? (
                    <div className="content">
                        {this.props.children}
                    </div>
                ) : ''}

            </div>
        );
    }
}

function isEmpty(data) {
    if (data) return false;
    if (Array.isArray(data) && data.length) return false;
    if (typeof data === 'object' && data && Object.keys(data).length) return false;
    return true;
}
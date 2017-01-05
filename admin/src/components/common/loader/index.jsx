/**
 * 加载器
 */
import React, { Component } from 'react';
import './style.scss';

export class LoaderComponent extends Component {
    render() {
        let {loading = false, data = []} = this.props;
        let len = Array.isArray(data) ? data.length : Object.keys(data).length;
        console.log(data);
        return (
            <div className="loader">

                {loading ? (
                    <div className="loading">加载中</div>
                ) : ''}

                {!loading && len ? (
                    <div className="list">
                        {this.props.children}
                    </div>
                ) : ''}

                {!loading && !len ? (
                    <div className="nodata">暂无数据</div>
                ) : ''}

            </div>
        );
    }
}
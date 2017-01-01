/**
 * 图片懒加载组件
 */
import React, { Component } from 'react';
import './style.scss';
import defaultPhoto from '../../../public/images/default.png';

export class LazyComponent extends Component {
    render() {
        let {photo, className = ''} = this.props;
        return (
            <img src={photo ? (window.server + '/resource/' + photo) : defaultPhoto} />
        );
    }
}
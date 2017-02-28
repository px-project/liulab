/**
 * 图片组件
 * 
 * @param type   'CATEGORY_COVER', 'USER_AVATAR'
 * @param link_id
 */
import React, { Component } from 'react';
import defaultPhoto from '../../../../public/images/default.png';
import classname from 'classname';
import './style.scss';

export class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: defaultPhoto
        };
    }

    render() {
        let {url} = this.props;

        return (
            <div className="l-image">
                <img src={this.state.image} />
                {url ? <img src={url} className="hide" onLoad={this.load.bind(this)} /> : ''}
            </div>
        );
    }

    load(e) {
        console.log(e);
    }
}
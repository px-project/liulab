/**
 * 图片组件
 * 
 * @param type   'CATEGORY_COVER', 'USER_AVATAR'
 * @param link_id
 */
import React, { Component } from 'react';
import defaultPhoto from '../../../public/images/default.png';
import './style.scss';

export class ImageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: defaultPhoto
        };
    }

    render() {
        let {type, link_id, className = '', src} = this.props, url = window.server;

        if (src) this.setState({ image: src });

        if (type === 'CATEGORY_COVER') url += '/category/' + link_id + '/cover';
        if (type === 'USER_AVATAR') url += '/user/' + link_id + '/avatar';

        return (
            <div className={"image " + className}>
                <img src={this.state.image} />
                {link_id ? (<img src={url} className="hide" onLoad={this.load.bind(this)} />) : ''}
            </div>
        );
    }

    load(e) {
        console.log(e);
    }
}
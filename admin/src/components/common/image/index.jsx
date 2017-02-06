/**
 * 图片组件
 */
import React, { Component } from 'react';
import './style.scss';
import defaultPhoto from '../../../public/images/default.png';

export class ImageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: defaultPhoto
        };
    }

    render() {
        let {type, link_id, className = ''} = this.props;
        return (
            <div className={"image " + className}>
                <img src={this.state.image} />
                <img src={window.server + '/resource/' + type + '/' + link_id} className="hide" onLoad={this.load.bind(this)} />
            </div>
        );
    }

    load(e) {
        console.log(e);
    }
}
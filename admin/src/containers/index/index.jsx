/**
 * 首页界面容器
 */
import React, {Component} from 'react';

export class IndexContainer extends Component {
    render () {
        return (
            <div>{this.props.children}</div>
        )
    }
}
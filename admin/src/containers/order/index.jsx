/**
 * 订购界面容器
 */
import React, {Component} from 'react';

export class OrderContainer extends Component {
    render () {
        return (
            <div>{this.props.children}</div>
        )
    }
}
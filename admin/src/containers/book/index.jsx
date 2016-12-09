/**
 * 订购界面容器
 */
import React, { Component } from 'react';

export class BookContainer extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}
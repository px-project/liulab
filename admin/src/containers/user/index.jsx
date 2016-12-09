/**
 * 用户容器
 */
import React, {Component} from 'react';

export class UserContainer extends Component {
    render () {
        return (
            <div>{this.props.children}</div>
        )
    }
}
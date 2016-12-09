/**
 * 角色界面容器
 */
import React, {Component} from 'react';

export class RoleContainer extends Component {
    render () {
        return (
            <div>{this.props.children}</div>
        )
    }
}
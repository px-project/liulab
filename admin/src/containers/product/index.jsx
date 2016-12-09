/**
 * 产品界面容器
 */
import React, {Component} from 'react';

export class ProductContainer extends Component {
    render () {
        return (
            <div>{this.props.children}</div>
        )
    }
}
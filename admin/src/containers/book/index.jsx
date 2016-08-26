/**
 * 订购模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';


class BookContainer extends Component {
	render () {
		return (
			<div>{this.props.children}</div>
		);
	}
}

export const BookApp = connect()(BookContainer);

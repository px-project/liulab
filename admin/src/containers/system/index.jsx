/**
 * 系统模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';


class SystemContainer extends Component {
	render () {
		return (
			<div>{this.props.children}</div>
		);
	}
}

export const SystemApp = connect()(SystemContainer);

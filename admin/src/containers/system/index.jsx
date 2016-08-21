/**
 * 系统模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';


class SystemContainer extends Component {
	render () {
		return (
			<h1>system</h1>
		);
	}
}

export const SystemApp = connect()(SystemContainer);

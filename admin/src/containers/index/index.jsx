/**
 * 首页模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';


class IndexContainer extends Component {
	render () {
		return (
			<h1>Index</h1>
		);
	}
}

export const IndexApp = connect()(IndexContainer);

/**
 * 首页模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';


class IndexContainer extends Component {
	render() {
		return (<div>{React.cloneElement(this.props.children, this.props) }</div>);
	}
}

export const IndexApp = connect()(IndexContainer);

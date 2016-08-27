/**
 * 系统模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';


class SystemContainer extends Component {
	render() {
		return (<div>{React.cloneElement(this.props.children, this.props) }</div>);
	}
}

export const SystemApp = connect()(SystemContainer);

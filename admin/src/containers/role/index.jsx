/**
 * 权限模块容器
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { xhttp, xform } from '../../actions/';
import { RoleListComponent as RoleList } from '../../components/';


class RoleContainer extends Component {
	render() {
		return (
			<div className="page role-page">
				<RoleList {...this.props}></RoleList>
				<div className="detail">
					{React.cloneElement(this.props.children, this.props)}
				</div>
			</div>
		);
	}
}


// 合并state
function mapStateToProps(state) {
	return state;
}

// 合并dispatch
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		xhttp,
		xform
	}, dispatch);
}

export const RoleApp = connect(mapStateToProps, mapDispatchToProps)(RoleContainer);

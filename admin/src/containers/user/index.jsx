/**
 * 用户模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UserList} from '../../components/user/list/';
import {fetchUserList} from '../../actions/user/fetchUserList';
import {fetchRoleList} from '../../actions/role/fetchRoleList';

class UserContainer extends Component {
	render () {
		return (
			<div>
				<UserList {...this.props}></UserList>
			</div>
		);
	}
}


// 合并state
function mapStateToProps (state) {
	return state;
}

// 合并dispatch
function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		fetchUserList,
		fetchRoleList
	}, dispatch);
}



export const UserApp = connect(mapStateToProps, mapDispatchToProps)(UserContainer);

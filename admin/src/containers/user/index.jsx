/**
 * 用户模块容器
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UserList} from '../../components/user/list/';
import {getUserList, getRoleList} from '../../actions/';

class UserContainer extends Component {
	componentWillMount () {
		this.currentUrl = this.props.routes[1].path;
	}
	render () {
		return (
			<div>
				{this.currentUrl === '/user' ? <UserList {...this.props}></UserList> : ''}
				{this.currentUrl === '/user/:_id' ? <UserDetail {...this.props} status="view"></UserDetail>: ''}
				{this.currentUrl === '/user/add' ? <UserDetail {...this.props} status="add"></UserDetail>: ''}
				{this.currentUrl === '/user/:_id/edit' ? <UserDetail {...this.props} status="edit"></UserDetail>: ''}
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
		getUserList,
		getRoleList
	}, dispatch);
}

export const UserApp = connect(mapStateToProps, mapDispatchToProps)(UserContainer);

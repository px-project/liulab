/**
 * 添加用户界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../actions';
import { UserEditComponent } from '../../components';

class UserAddApp extends Component {

    render() {
        return (<UserEditComponent {...this.props}></UserEditComponent>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const UserAddContainer = connect(mapStateToProps, mapDispatchToProps)(UserAddApp);

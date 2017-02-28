/**
 * 用户详情界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserDetailComponent } from '../../components';

class UserDetailApp extends Component {

    componentWillMount() {
        this.props.xhttp.list('role');
    }

    render() {
        return (<UserDetailComponent {...this.props}></UserDetailComponent>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const UserDetailContainer = connect(mapStateToProps, mapDispatchToProps)(UserDetailApp);

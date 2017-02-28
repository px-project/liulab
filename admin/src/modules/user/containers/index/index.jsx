/**
 * 订单模块容器
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserComponent } from '../../components';

class UserApp extends Component {

    componentWillMount() {
        let {xhttp} = this.props;
        xhttp.list('role');
        xhttp.list('user');
    }

    render() {
        return (<UserComponent {...this.props}></UserComponent>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const UserContainer = connect(mapStateToProps, mapDispatchToProps)(UserApp);

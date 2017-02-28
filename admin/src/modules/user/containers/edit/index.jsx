/**
 * 编辑用户界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserEditComponent } from '../../components';

class UserEditApp extends Component {

    componentWillMount() {
        let {xhttp, xform, params} = this.props;
        xhttp.list('role');
        xhttp.detail('user', [params.user_id]).then(result => xform.init(result));
    }

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

export const UserEditContainer = connect(mapStateToProps, mapDispatchToProps)(UserEditApp);

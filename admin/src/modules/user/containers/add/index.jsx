/**
 * 添加用户界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../actions';
import { UserEditComponent } from '../../components';

class UserAddApp extends Component {

    componentWillMount () {
        this.props.xhttp.list('role');
    }

    render() {
        return (<UserEditComponent {...this.props}></UserEditComponent>);
    }


    // 保存
    save(option, data, e) {
        e.target.disabled = true;
        let {xhttp, history} = this.props;

        if (option.user_id) {
            this.updateUserDetail(option.user_id, data, result => {
                history.pushState(null, '/user');
            });
        } else {
            this.createUserDetail(data, result => {
                history.pushState(null, '/user');
            });
        }
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const UserAddContainer = connect(mapStateToProps, mapDispatchToProps)(UserAddApp);

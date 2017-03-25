/**
 * 角色界面
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RoleList, RoleView, RoleEdit } from '../../components';
import { Loader, xhttp } from '../../../common';
import { changeStatus } from '../../actitons';
import './style.scss';

class rolePage extends React.Component {
    componentWillMount() {
        this.props.xhttp.list('role');
    }
    render() {
        let { xhttp, role, children } = this.props;
        return (
            <Loader className="role-page" loading={role.fetching.list}>
                <RoleList {...this.props}></RoleList>
                <div className="role-detail">{children}</div>
            </Loader>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp: xhttp(dispatch),
        changeStatus: bindActionCreators(changeStatus, dispatch)
    };
}

export const RolePage = connect(mapStateToProps, mapDispatchToProps)(rolePage);
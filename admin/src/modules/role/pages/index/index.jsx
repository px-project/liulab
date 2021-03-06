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
import { Route, Switch } from 'react-router-dom';
import { RoleEditPage, RoleAddPage, RoleDetailPage } from '..';

const Empty = () => (
    <div className="role-empty">
        <header className="header"></header>
        <div className="detail">
            <p className="empty">请选择右侧角色查看详情</p>
        </div>
    </div>
);

class rolePage extends React.Component {
    componentWillMount() {
        let { xhttp } = this.props;
        xhttp.list('role');
    }
    render() {
        let { xhttp, role, children } = this.props;
        return (
            <Loader className="role-page page" loading={ role.fetching.list }>
                <RoleList {...this.props}></RoleList>
                <div className="role-detail">
                    <Switch>
                        <Route path="/role/add" component={ RoleAddPage }></Route>
                        <Route path="/role/:role_id/edit" component={ RoleEditPage }></Route>
                        <Route path="/role/:role_id" component={ RoleDetailPage }></Route>
                        <Route path="/role" component={ Empty }></Route>
                    </Switch>
                </div>
            </Loader>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp: xhttp(dispatch)
    };
}

export const RolePage = connect(mapStateToProps, mapDispatchToProps)(rolePage);
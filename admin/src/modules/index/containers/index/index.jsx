/**
 * 首页模块容器
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../actions';
import { IndexComponent } from '../../components';

class IndexApp extends Component {

    render() {
        return (<IndexComponent {...this.props}></IndexComponent>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    let result = {};
    Object.keys(actions).forEach(key => {
        if (typeof actions[key] === 'function') return result[key] = bindActionCreators(actions[key], dispatch);
        result[key] = bindActionCreators(
            Object.assign({}, ...Object.keys(actions[key]).map(ck => ({ [ck]: actions[key][ck] })))
            , dispatch
        );
    });
    return result;
}

export const IndexContainer = connect(mapStateToProps, mapDispatchToProps)(IndexApp);

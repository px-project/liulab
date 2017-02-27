/**
 * 添加品类洁面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../actions';
import { CategoryEditComponent } from '../../components';

class CategoryAddApp extends Component {

    render() {
        return (<CategoryEditComponent {...this.props}></CategoryEditComponent>);
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

export const CategoryAddContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryAddApp);

/**
 * 添加品类洁面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    return {};
}

export const CategoryAddContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryAddApp);

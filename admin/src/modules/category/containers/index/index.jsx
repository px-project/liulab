/**
 * 品类模块容器
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CategoryComponent } from '../../components';

class CategoryApp extends Component {

    componentWillMount() {
        this.props.xhttp.list('category');
    }

    render() {
        return (<CategoryComponent {...this.props}></CategoryComponent>);
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const CategoryContainer = connect()(CategoryApp);

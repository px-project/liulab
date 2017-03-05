/**
 * 添加品类洁面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CategoryEditComponent, CategoryEditField } from '../../components';

class categoryAddPage extends Component {

    render() {
        // return (<CategoryEditComponent {...this.props}></CategoryEditComponent>);
        return (<CategoryEditField onSubmit={this.demo.bind(this)} {...this.props}></CategoryEditField>);

    }
    demo (value) {
        console.log(value);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const CategoryAddPage = connect(mapStateToProps, mapDispatchToProps)(categoryAddPage);

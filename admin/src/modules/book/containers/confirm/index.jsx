/**
 * 确认订单界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BookConfirmComponent } from '../../components';

class BookConfirmApp extends Component {
    render() {
        return (<BookConfirmComponent {...this.props}></BookConfirmComponent>);
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const BookConfirmContainer = connect(mapStateToProps, mapDispatchToProps)(BookConfirmApp);

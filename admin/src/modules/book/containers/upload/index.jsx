/**
 * 批量订购界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BookUploadComponent } from '../../components';

class BookUploadApp extends Component {

    render() {
        return (<BookUploadComponent {...this.props}></BookUploadComponent>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const BookUploadContainer = connect(mapStateToProps, mapDispatchToProps)(BookUploadApp);

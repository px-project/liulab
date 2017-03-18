/**
 * 批量订购界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BookUpload } from '../../components';

class bookUploadPage extends React.Component {

    render() {
        return (<BookUpload {...this.props}></BookUpload>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const BookUploadPage = connect(mapStateToProps, mapDispatchToProps)(bookUploadPage);

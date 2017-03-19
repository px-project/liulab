/**
 * 批量订购界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BookUpload } from '../../components';
import { xhttp } from '../../../common';
import { uploadCategorySelect, uploadChangeStep } from '../../actions';

class bookUploadPage extends React.Component {
    componentWillMount() {
        let { xhttp, changeStep } = this.props;
        changeStep('category');
        xhttp.list('category');
    }

    render() {
        return (<BookUpload {...this.props}></BookUpload>);
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp: xhttp(dispatch),
        categorySelect: bindActionCreators(uploadCategorySelect, dispatch),
        changeStep: bindActionCreators(uploadChangeStep, dispatch)
    };
}

export const BookUploadPage = connect(mapStateToProps, mapDispatchToProps)(bookUploadPage);

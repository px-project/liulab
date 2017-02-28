/**
 * 货单详情界面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ManifestDetailComponent } from '../../components';

class ManifestDetailApp extends Component {

    render() {
        return (<ManifestDetailComponent {...this.props}></ManifestDetailComponent>);
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const ManifestDetailContainer = connect(mapStateToProps, mapDispatchToProps)(ManifestDetailApp);

/**
 * 货单详情界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ManifestDetail } from '../../components';

class manifestDetailPage extends React.Component {
    componentWillMount() {
        let { xhttp, params } = this.props;
        xhttp.detail('manifest', [params.manifest_id]);
    }
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

export const ManifestDetailPage = connect(mapStateToProps, mapDispatchToProps)(manifestDetailPage);

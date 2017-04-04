/**
 * 货单详情界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { xhttp, Loader } from '../../../common';
import { ManifestDetail } from '../../components';

class manifestDetailPage extends React.Component {
    componentWillMount() {
        let { xhttp, match } = this.props;
        xhttp.detail('manifest', [match.params.manifest_id]).then(manifest => {
            xhttp.list('timeline', [], { link_id: manifest._id });
        });
    }
    render() {
        let { manifest, entities } = this.props;
        return (
            <Loader className="manifest-detail-page page" loading={ manifest.fetching.detail }>
                <ManifestDetail manifestDetail={ entities[manifest.detail] } {...this.props}></ManifestDetail>
            </Loader>
        );
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp: xhttp(dispatch)
    };
}

export const ManifestDetailPage = connect(mapStateToProps, mapDispatchToProps)(manifestDetailPage);

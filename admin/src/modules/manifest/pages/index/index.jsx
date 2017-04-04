/**
 * 货单列表界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ManifestList } from '../../components';
import { xhttp } from '../../../common';
import { selectManifest } from '../../actions';
import { MANIFEST_STATUS } from '../../constants';

class manifestPage extends React.Component {

    componentWillMount() {
        let { xhttp } = this.props;
        xhttp.list('category');
        this.getManifestList();
    }

    render() {
        return <ManifestList {...this.props} update={ this.updateManifestStatus.bind(this) }></ManifestList>;
    }

    getManifestList() {
        this.props.xhttp.list('manifest');
    }

    updateManifestStatus(status) {
        let { manifest_selected, xhttp, entities } = this.props;
        let manifests = manifest_selected.map(manifest_id => {
            let states = Object.keys(MANIFEST_STATUS);
            if (states.indexOf(entities[manifest_id].status) === states.indexOf(status) - 1) return manifest_id;
        });
        console.log(this, manifests);

        // this.props.xhttp.update('manifest', );
    }




}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp: xhttp(dispatch),
        selectManifest: bindActionCreators(selectManifest, dispatch)
    };
}

export const ManifestPage = connect(mapStateToProps, mapDispatchToProps)(manifestPage);

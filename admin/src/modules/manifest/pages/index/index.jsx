/**
 * 货单列表界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ManifestList } from '../../components';
import { xhttp } from '../../../common';

class manifestPage extends React.Component {

    componentWillMount() {
        let { xhttp } = this.props;
        xhttp.list('category', [], {});
        xhttp.list('manifest', [], {});
    }

    render() {
        return (<ManifestList {...this.props}></ManifestList>);
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

export const ManifestPage = connect(mapStateToProps, mapDispatchToProps)(manifestPage);

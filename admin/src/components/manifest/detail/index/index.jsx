/**
 * 货单详情
 */
import React, { Component } from 'react';
import { Loader } from '../../../common/';
import { Timeline } from '../timeline/';
import { Info } from '../info/';
import './style.scss';

export class ManifestDetailComponent extends Component {
    componentWillMount() {
        let {xhttp, params} = this.props;
        this.props.xhttp.detail('manifest', [params.manifest_id]);
    }
    render() {
        let {params, entities, manifest} = this.props;
        let manifestDetail = entities[manifest.detail];

        console.log(manifestDetail);
        return (
            <Loader className="page manifest-detail-page" loading={manifest.fetching} data={manifestDetail}>
                <Info {...this.props}></Info>
                <Timeline {...this.props}></Timeline>
            </Loader>
        );
    }
}
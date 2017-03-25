/**
 * 货单详情
 */
import React, { Component } from 'react';
import { Loader } from '../../../../common';
import { Timeline } from '../timeline';
import { Info } from '../info';
import './style.scss';

export const ManifestDetail = ({ manifest, entities }) => (
    <Loader className="page manifest-detail-page" loading={manifest.fetching.detail} data={manifest.detail}>
        <Info manifestDetail={entities[manifest.detail]}></Info>
        <Timeline progress={entities[manifest.detail] && entities[manifest.detail].progress}></Timeline>
    </Loader>
)
/**
 * 货单详情
 */
import React, { Component } from 'react';
import { Loader } from '../../../../common';
import { Timeline } from '../timeline';
import { Info } from '../info';
import './style.scss';

export const ManifestDetail = ({ manifestDetail, entities }) => (
    <div className="manifest-detail">
        <Info manifestDetail={ manifestDetail }></Info>
        <Timeline progress={ manifestDetail && manifestDetail.progress }></Timeline>
    </div>
)
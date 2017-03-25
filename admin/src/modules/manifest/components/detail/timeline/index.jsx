/**
 * 货单详情时间轴组件
 */
import React from 'react';
import './style.scss';

export class Timeline extends React.Component {
    render() {
        let { entities, manifest } = this.props;
        let { progress } = entities[manifest.detail];
        return (
            <div className="manifest-detail-timeline">
                <ul>
                </ul>
            </div>
        );
    }
}
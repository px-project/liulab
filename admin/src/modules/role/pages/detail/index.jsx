/**
 * role detail page.
 */
import React from 'react';
import { RoleView } from '../../components/view';
import { xhttp } from '../../../common';
import { connect } from 'react-redux';


export class roleDetailPage extends React.Component {
    render() {
        let { entities, match } = this.props;
        return (
            <div className="role-detail-page page">
                <RoleView role={ entities[match.params.role_id] }></RoleView>
            </div>
        );
    }
}

function mapState(state) {
    return state;
}

function mapAction(dispatch) {
    return {
        xhttp: xhttp(dispatch)
    }
}

export const RoleDetailPage = connect(mapState, mapAction)(roleDetailPage);
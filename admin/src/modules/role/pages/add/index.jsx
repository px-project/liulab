/**
 * add role page.
 */
import React from 'react';
import { RoleEdit } from '../../components';
import { xhttp } from '../../../common';
import { connect } from 'react-redux';

export class roleAddPage extends React.Component {
    render() {
        return (
            <div className="role-add-page page">
                <RoleEdit onSubmit={ this.save.bind(this) }></RoleEdit>
            </div>
        );
    }
    save(value) {
        this.props.xhttp.create('role', [], value).then(result => {

        });
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

export const RoleAddPage = connect(mapState, mapAction)(roleAddPage);
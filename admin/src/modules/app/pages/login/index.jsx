/**
 * login page.
 */
import React from 'react';
import { connect } from 'react-redux';
import './style.scss';

export class loginPage extends React.Component {
    render() {
        return (
            <div className="login-page page">
                login
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(loginPage);
/**
 * form input component
 */
import React, { Component } from 'react';
import './style.scss';

export class FormInput extends Component {
    render() {
        return (
            <div className="ui">
                <input type="text" />
            </div>
        );
    }
}
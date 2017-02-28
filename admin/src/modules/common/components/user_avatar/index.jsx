/**
 * user avatar component.
 */
import React, { Component } from 'react';
import { Image } from '..';
import './style.scss';

export class UserAvatar extends Component {
    render() {
        let {user_id} = this.props;
        return (
            <div className="user-avatar">
                <Image src={`${window.server}/user/${user_id}/avatar`}></Image>
            </div>
        )
    }
}
/**
 * category cover component.
 */
import React, { Component } from 'react';
import { Image } from '..';
import './style.scss';

export class CategoryCover extends Component {
    render() {
        let { category_id, className } = this.props;
        return (
            <div className={`l-category-cover ${className}`}>
                <Image src={`${window.server}/category/${category_id}/cover`}></Image>
            </div>
        );
    }
}
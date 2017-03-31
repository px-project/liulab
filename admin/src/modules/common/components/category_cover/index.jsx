/**
 * category cover component.
 */
import React, { Component } from 'react';
import { Image } from '..';
import './style.scss';

export const CategoryCover = ({ category_id, className }) => (
    <div className={ `l-category-cover ${className}` }>
        <Image src={ `${window.server}/category/${category_id}/cover` }></Image>
    </div>
);
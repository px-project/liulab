/**
 * 字段
 */
import React from 'react';
import './style.scss';

export const Field = ({ className = '', name = '', children = '' }) => (
    <div className={ `l-field ${className}` }>
        <label>{ name }</label>
        <span className="value">{ children }</span>
    </div>
);
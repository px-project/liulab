/**
 * 区域组件
 */
import React, { Component } from 'react';
import './style.scss';

export const Sec = ({ children, title, className = '' }) => (
    <div className={ `l-sec ${className}` }>
        <h5 className="l-sec-title">{ title }</h5>
        <div className="cont">
            { children }
        </div>
    </div>
);
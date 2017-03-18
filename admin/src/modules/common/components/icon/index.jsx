/**
 * icon component
 */
import React from 'react';
import './style.scss';

export const Icon = ({ icon, classname }) => (
    <i className={`l-icon fa fa-${icon} ${classname}`}></i>
);
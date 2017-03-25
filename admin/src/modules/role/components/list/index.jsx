/**
 * 角色页面
 */
import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './style.scss';

export const RoleList = ({ role, entities, changeStatus, location }) => (
    <div className="role-list">
        <header className="header">
            {location.pathname !== '/role/add' && <Link to="/role/add" className="ui teal fluid button">添加</Link>}
        </header>
        <ul>
            {role.items.map((role_id, index) => (
                <li key={index} name={entities[role_id].name}></li>
            ))}
            {!role.items.length && <p className="empty">暂无数据</p>}
        </ul>
    </div>
);
/**
 * 角色页面
 */
import React from 'react';
import { Button } from 'semantic-ui-react';
import './style.scss';

export const RoleList = ({ role, entities, changeStatus, role_status }) => (
    <div className="role-list">
        <header className="header">
            {role_status === 'view' && <Button color="teal" fluid={true} onClick={() => changeStatus('add')}>添加</Button>}
        </header>
        <ul className="list">
            {role.items.map((role_id, index) => (
                <li key={index} name={entities[role_id].name}></li>
            ))}
            {!role.items.length && <p className="empty">暂无数据</p>}
        </ul>
    </div>
);
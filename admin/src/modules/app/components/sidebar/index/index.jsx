/**
 * 侧边栏组件
 */
import React from 'react';
import { SidebarNav } from '../nav/';
import { SidebarLogo } from '../logo/';
import './style.scss';

export const Sidebar = () => (
	<sidebar id="sidebar">
		<SidebarLogo></SidebarLogo>
		<SidebarNav></SidebarNav>
	</sidebar>
);
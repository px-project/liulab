/**
 * 面包屑导航
 */
import React, { Component } from 'react';
const Breadcrumbs = require('react-breadcrumbs');
import './style.scss';

export class AppHeaderNavComponent extends Component {
    render() {
        let {routes, params} = this.props;
        // return (
        //     <div className="header-nav">
        //         <Breadcrumbs setDocumentTitle={true} displayMissing={false} routes={routes} params={params}></Breadcrumbs>
        //     </div>
        // );
        return (<div></div>)
    }
}
/**
 * 路由
 */
import React from 'react';
import { Route } from 'react-router-dom';
import routerConfig from '../../../config/router.json';
import * as Pages from '../../pages';
import { toBigCamcelCase } from '../../../utils';

export const AppRouter = () => (
    <div className="views">
        {routerConfig.map((route, routeIndex) => route.pages.map((page, pageIndex) => (
            <Route path={`/${route.path}` + (page.path ? `/${page.name || page.path}` : '')} key={`${routeIndex}${pageIndex}`}
                render={() => {
                    const Page = Pages[toBigCamcelCase(route.path, page.path, 'page')];
                    return <Page></Page>
                }}></Route>
        )))}
    </div>
)

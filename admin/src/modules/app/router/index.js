/**
 * 路由
 */
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import * as Pages from '../../pages';
import { toBigCamcelCase } from '../../../utils';
const routerConfig = require('../../../config/router.json');

export const AppRouter = () => (
    <div className="views">
        <Switch>
            {routerConfig.map((module, moduleIndex) => module.pages.map((page, pageIndex) => (
                <Route path={`/${module.path}` + (page.path ? `/${page.path}` : '')}
                    key={`${moduleIndex}${pageIndex}`}
                    component={Pages[toBigCamcelCase(module.path, (page.name || page.path), 'page')]}
                ></Route>
            )))}
            <Route component={Pages.HomePage} />
        </Switch>
    </div>
)
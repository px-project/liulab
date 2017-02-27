// /**
//  * 路由
//  */
// import React, { Component } from 'react';
// import { Router, Route, IndexRoute, IndexRedirect, useRouterHistory } from 'react-router';
// import * as containers from '../containers/';
// import * as components from '../components/';
// import routes from '../config/routes.json';
// import { createHistory } from 'history';
// import { toBigCamcelCase } from '../utils/';
// const _ = require('lodash');
// import { AppContainer, CategoryContainer } from '../modules/containers';

// const history = useRouterHistory(createHistory)({ basename: window.location.origin + '/' });

// export default class Routes extends Component {
//     render() {
//         // let router = routes.filter(topLevel => window.permission.filter(item => item.module === topLevel.path)[0].allow);
//         let router = routes;

//         // return (
//         //     <Router history={history}>
//         //         <Route path="/" component={containers.App}>
//         //             <IndexRedirect to="/index" />
//         //             {router.map((module, module_index) => (
//         //                 <Route path={module.path} key={module_index}>
//         //                     {module.index ? (<IndexRedirect to={module.index} />) : ''}

//         //                     {module.pages.map((page, page_index) => {
//         //                         if (page.path === "") {
//         //                             if (page.children) {
//         //                                 return (
//         //                                     <Route name={page.name} status={page.status} component={components[toBigCamcelCase(module.path, 'component')]} key={page_index}>
//         //                                         {page.children.map((child, child_index) => (
//         //                                             <Route status={child.status} path={child.path} component={components[toBigCamcelCase(module.path, page.component, child.component || child.path, 'component')]} key={child_index}></Route>
//         //                                         ))}
//         //                                     </Route>
//         //                                 );
//         //                             } else {
//         //                                 return (<IndexRoute name={page.name} status={page.status} component={components[toBigCamcelCase(module.path, 'component')]} key={page_index} />);
//         //                             }
//         //                         } else {
//         //                             return (<Route path={page.path} component={components[toBigCamcelCase(module.path, page.component || page.path, 'component')]} key={page_index}></Route>)
//         //                         }
//         //                     })}
//         //                 </Route>
//         //             ))}
//         //         </Route>
//         //     </Router>
//         // );
//         return (
//             <Router history={history}>
//                 <Route path="/" component={AppContainer}>
//                     <IndexRedirect to="/category"></IndexRedirect>
//                     <Route path="/category" component={CategoryContainer}></Route>
//                 </Route>
//             </Router>
//         );
//     }
// }

/**
 * 路由
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import * as lodash from 'lodash';
import routes from '../config/routes.json';
import { toBigCamcelCase } from '../utils/';
import * as containers from '../modules/containers';

const history = useRouterHistory(createHistory)({ basename: window.location.origin + '/' });

export default class Routes extends Component {
    render() {
        // let router = routes.filter(topLevel => window.permission.filter(item => item.module === topLevel.path)[0].allow);
        let router = routes;

        // return (
        //     <Router history={history}>
        //         <Route path="/" component={containers.App}>
        //             <IndexRedirect to="/index" />
        //             {router.map((module, module_index) => (
        //                 <Route path={module.path} key={module_index}>
        //                     {module.index ? (<IndexRedirect to={module.index} />) : ''}

        //                     {module.pages.map((page, page_index) => {
        //                         if (page.path === "") {
        //                             if (page.children) {
        //                                 return (
        //                                     <Route name={page.name} status={page.status} component={components[toBigCamcelCase(module.path, 'component')]} key={page_index}>
        //                                         {page.children.map((child, child_index) => (
        //                                             <Route status={child.status} path={child.path} component={components[toBigCamcelCase(module.path, page.component, child.component || child.path, 'component')]} key={child_index}></Route>
        //                                         ))}
        //                                     </Route>
        //                                 );
        //                             } else {
        //                                 return (<IndexRoute name={page.name} status={page.status} component={components[toBigCamcelCase(module.path, 'component')]} key={page_index} />);
        //                             }
        //                         } else {
        //                             return (<Route path={page.path} component={components[toBigCamcelCase(module.path, page.component || page.path, 'component')]} key={page_index}></Route>)
        //                         }
        //                     })}
        //                 </Route>
        //             ))}
        //         </Route>
        //     </Router>
        // );
        return (
            <Router history={history}>
                <Route path="/" component={containers.AppContainer}>
                    <IndexRedirect to="/index"></IndexRedirect>
                    {routes.map((module, index) => (
                        <Route path={module.path} component={containers[toBigCamcelCase(module.path, 'container')]} key={index}>
                        </Route>
                    ))}
                </Route>
            </Router>
        );
    }
}

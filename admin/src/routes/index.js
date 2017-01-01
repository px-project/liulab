/**
 * 路由
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, useRouterHistory } from 'react-router';
import * as containers from '../containers/';
import * as components from '../components/';
import routes from '../config/routes.json';
import { createHistory } from 'history';
import { toCamcel } from '../utils/';
const _ = require('lodash');

const history = useRouterHistory(createHistory)({ basename: window.location.origin + '/' });

export default class Routes extends Component {
    render() {
        // let router = routes.filter(topLevel => window.permission.filter(item => item.module === topLevel.path)[0].allow);
        let router = routes;

        // return (
        //     <Router history={history}>
        //         <Route path="/" component={containers.App}>
        //             <IndexRedirect to="/index" />

        //             <Route path="index">

        //             </Route>

        //             <Route path="book">
        //                 <IndexRoute component={components.BookComponent}/>
        //                 <Route path="upload" component={components.BookUploadComponent}></Route>
        //                 <Route path="confirm" component={components.BookConfirmComponent}></Route>
        //             </Route>

        //             <Route path="order">
        //                 <IndexRedirect to="index/total" />

        //                 <Route path="index" component={components.OrderComponent}>
        //                     <Route path="total" component={components.OrderTotalComponent}></Route>
        //                     <Route path="child" component={components.OrderChildComponent}></Route>
        //                 </Route>

        //                 <Route path=":order_id" component={components.OrderDetailComponent}></Route>
        //             </Route>

        //             <Route path="product">
        //                 <IndexRoute component={components.ProductComponent} />
        //                 <Route path="add" component={components.ProductAddComponent}></Route>
        //                 <Route path=":product_id" component={components.ProductDetailComponent}></Route>
        //                 <Route path=":product_id/edit" components={components.ProductEditComponent}></Route>
        //             </Route>

        //             <Route path="user">

        //             </Route>

        //             <Route path="category">

        //             </Route>

        //             <Route path="role">

        //             </Route>
        //         </Route>
        //     </Router>
        // );

        return (
            <Router history={history}>
                <Route path="/" component={containers.App}>
                    <IndexRedirect to="/index" />
                    {router.map((module, module_index) => (
                        <Route path={module.path} key={module_index}>
                            {module.index ? (<IndexRedirect to={module.index} />) : ''}

                            {module.pages.map((page, page_index) => {
                                if (page.path === "") {
                                    if (page.children) {
                                        return (
                                            <Route component={components[toCamcel(true, module.path, 'component')]} key={page_index}>
                                                {page.children.map((child, child_index) => (
                                                    <Route path={child.path} component={components[toCamcel(true, module.path, page.component, child.component || child.path, 'component')]} key={child_index}></Route>
                                                ))}
                                            </Route>
                                        );
                                    } else {
                                        return (<IndexRoute component={components[toCamcel(true, module.path, 'component')]} key={page_index} />);
                                    }
                                } else {
                                    return (<Route path={page.path} component={components[toCamcel(true, module.path, page.component || page.path, 'component')]} key={page_index}></Route>)
                                }
                            })}
                        </Route>
                    ))}
                </Route>
            </Router>
        );
    }
}
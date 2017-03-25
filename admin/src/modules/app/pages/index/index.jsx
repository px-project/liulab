/**
 * 主界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { xhttp } from '../../../common/actions';
import { Header, Sidebar } from '../../components';
import { AppRouter } from '../../router';
import * as _ from 'lodash';
import { Route, Switch } from 'react-router-dom';
import * as pages from '../../../pages';
const routerConfig = require('../../../../config/router.json');
import { toBigCamcelCase } from '../../../../utils';
import './style.scss';

class appPage extends React.Component {
    componentWillMount() {
        // this.props.xhttp.detail('user_current', [], {});
    }

    render() {
        return (
            <div className="app">
                <Sidebar {...this.props}></Sidebar>
                <div id="main">
                    <Header {...this.props}></Header>
                    <div className="views">
                        <Switch>
                            {routerConfig.map((module, moduleIndex) => module.pages.map((page, pageIndex) => (
                                <Route key={`${moduleIndex}${pageIndex}`} {...this.props}
                                    path={`/${module.path}` + (page.path ? `/${page.path}` : '')}
                                    component={pages[toBigCamcelCase(module.path, (page.name || page.path), 'page')]}>
                                    <Switch>
                                        {page.children && page.children.map((child, childIndex) => (
                                            <Route path={child.path} {...this.props} key={`${moduleIndex}${pageIndex}${childIndex}`}
                                                component={pages[toBigCamcelCase(module.path, (page.name || page.path), (child.name || child.path), 'page')]}></Route>))}
                                    </Switch>
                                </Route>
                            )))}
                            <Route component={pages.HomePage} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp: xhttp(dispatch)
    };
}

export const AppPage = connect(mapStateToProps, mapDispatchToProps)(appPage);

import React, { lazy, Suspense } from 'react';
import { Layout } from "antd";
import { Route, Switch, Redirect } from 'react-router-dom';

// lazy懒加载组件，配合Suspense使用
const SiderBar = lazy(() => import(/* webpackChunkName: "SiderBar" */ '../components/layout/SiderBar'))
const HeaderBar = lazy(() => import(/* webpackChunkName: "HeaderBar" */ '../components/layout/HeaderBar'));
const Home = lazy(() => import(/* webpackChunkName: "home" */ '../pages/home/Home'));
const Connect = lazy(() => import(/* webpackChunkName: "connect" */ '../pages/user/connect/Connect'));
const List = lazy(() => import(/* webpackChunkName: "userList" */ '../pages/user/list/List'));
const Rich = lazy(() => import(/* webpackChunkName: "rich" */ '../pages/tool/rich/Rich'));
const NotFind = lazy(() => import(/* webpackChunkName: "notFind" */ '../pages/notFind/NotFind'));

class Index extends React.Component {
  render() {
    const loggedIn = window.localStorage.getItem('loggedIn');
    const mainPage = (
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          {/* 左侧菜单 */}
          <SiderBar></SiderBar>
          <Layout>
            {/* 顶部header */}
            <HeaderBar history={this.props.history}></HeaderBar>
            <div className="layout-content">
              {/* <Suspense fallback={<div>Loading...</div>}> */}
              <Switch>
                {/* exact能够使得路由的匹配更严格一些 */}
                <Route exact path="/" component={Home} />
                <Route path="/user/connect" component={Connect} />
                <Route path="/user/list" component={List} />
                <Route path="/tool/rich" component={Rich} />
                <Route component={NotFind} />
              </Switch>
              {/* </Suspense> */}
            </div>
          </Layout>
        </Suspense>
      </Layout>
    );
    return (
      loggedIn ? (
        mainPage
      ) : (
        <Redirect to="/login" />
      )
    );
  }
}

export default Index;

import React from 'react';
import ReactDOM from 'react-dom';
// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router'
import App from './components/App';
import Home from './components/Home';
import Route1 from './components/Route1';
import Route2 from './components/Route2';

ReactDOM.render(
   <Router history={hashHistory} >
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="route1" component={Route1} />
            <Route path="route2" component={Route2} />
        </Route>
    </Router>,
  document.body.appendChild(document.createElement('div'))
);

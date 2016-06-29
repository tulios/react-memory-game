import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import React from 'react'

import Layout from './views/layout'
import PageNotFound from './views/page-not-found'
import Home from './views/home'

export default (
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Home} />
      <Route path='*' component={PageNotFound}/>
    </Route>
  </Router>
)

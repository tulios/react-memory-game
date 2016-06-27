import { Router, Route, browserHistory } from 'react-router'
import React from 'react' // eslint-disable-line no-unused-vars
import Layout from './views/layout'
import PageNotFound from './views/page-not-found'

export default (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <Route path='*' component={PageNotFound}/>
    </Route>
  </Router>
)

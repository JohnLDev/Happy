// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'

import Landing from '../pages/Landing'
import OrphangesMap from '../pages/OrphanagesMap'

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route path='/orphanages' component={OrphangesMap} />
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
)
export default Routes

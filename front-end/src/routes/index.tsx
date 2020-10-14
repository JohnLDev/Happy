// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'

import Landing from '../pages/Landing'
import OrphangesMap from '../pages/OrphanagesMap'
import Orphange from '../pages/Orphanage'
import CreateOrphanage from '../pages/CreateOrphanage'

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route path='/orphanages' exact component={OrphangesMap} />

      <Route path='/orphanages/create' exact component={CreateOrphanage} />
      <Route path='/orphanages/:id' exact component={Orphange} />
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
)
export default Routes

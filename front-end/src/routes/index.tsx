/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'

import Landing from '../pages/Landing'
import OrphangesMap from '../pages/OrphanagesMap'
import Orphange from '../pages/Orphanage'
import CreateOrphanage from '../pages/CreateOrphanage'
import LoginPage from '../pages/LoginPage'
import ForgotPassword from '../pages/ForgotPassword'
import AdminPage from '../pages/AdminPage'
import EditOrphanage from '../pages/EditOrphanage'
import ExcludePage from '../pages/ExcludePage'
import CreatedPage from '../pages/CreatedPage'
import AcceptOrRemoveOrphanage from '../pages/AcceptOrRemoveOrphanage'
import { isAuthenticated } from '../services/auth'

console.log(isAuthenticated())
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
)

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/loginpage' exact component={LoginPage} />
      <Route path='/forgotpassword' exact component={ForgotPassword} />

      <PrivateRoute path='/adminpage' component={AdminPage} />
      <PrivateRoute
        path='/orphanageeditor/:id'
        exact
        component={EditOrphanage}
      />
      {/* <Route path='/orphanageeditor/:id' exact component={EditOrphanage} /> */}
      <PrivateRoute
        path='/handleorphanage/:id'
        exact
        component={AcceptOrRemoveOrphanage}
      />
      {/* <Route
        path='/handleorphanage/:id'
        exact
        component={AcceptOrRemoveOrphanage}
      /> */}

      <Route path='/excluded' exact component={ExcludePage} />
      <Route path='/created' exact component={CreatedPage} />

      <Route path='/' exact component={Landing} />
      <Route path='/orphanages' exact component={OrphangesMap} />

      <Route path='/orphanages/create' exact component={CreateOrphanage} />
      <Route path='/orphanages/:id' exact component={Orphange} />
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
)
export default Routes

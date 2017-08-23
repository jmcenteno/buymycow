import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Views/Home';
import PageNotFound from './components/Views/PageNotFound';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route component={PageNotFound}/>
    </Switch>
  );
}

export default Routes;

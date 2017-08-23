import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Views/Home';
import Products from './components/Views/Products';
import PageNotFound from './components/Views/PageNotFound';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/products' component={Products} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default Routes;

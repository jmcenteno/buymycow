import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Views/Home';
import Products from './components/Views/Products';
import ProductDetails from './components/Views/ProductDetails';
import PageNotFound from './components/Views/PageNotFound';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/products' component={Products} />
      <Route exact path='/products/:key' component={ProductDetails} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default Routes;

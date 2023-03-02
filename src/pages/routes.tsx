import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// utils
import Navigation from '../components/Navigation';
import Home from './Home';

function Routes() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route component={Home} exact path="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

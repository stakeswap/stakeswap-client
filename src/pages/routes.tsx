import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// utils
import Navigation from '../components/Navigation';
import Home from './Home';
import Pool from './Pool';
import Swap from './Swap';

function Routes() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Swap} exact path="/swap" />
        <Route component={Pool} exact path="/pool" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

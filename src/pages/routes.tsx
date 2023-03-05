import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

// utils
import Navigation from '../components/Navigation';
import Swap from './Swap';
import Pool from './Pool';
import AddPool from './Pool/AddPool';
import CheckPool from './Pool/CheckPool';
import RemovePool from './Pool/RemovePool';

function Routes() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Redirect exact from="/" to="/swaps" />
        <Route component={Swap} exact path="/swaps" />
        <Route component={Pool} exact path="/pools" />
        <Route component={AddPool} exact path="/pools/add" />
        <Route component={CheckPool} exact path="/pools/1" />
        <Route component={RemovePool} exact path="/pools/1/remove" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

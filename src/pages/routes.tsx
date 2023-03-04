import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// utils
import Navigation from '../components/Navigation';
import Home from './Home';
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
        <Route component={Home} exact path="/" />
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

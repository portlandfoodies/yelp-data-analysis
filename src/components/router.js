import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import App from "./App";
import About from "./about"
import Navbar from "./navbar"
export default () => (  
    <HashRouter>
      <Route component={Navbar} />
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/about" component={About} />
      </Switch>
    </HashRouter>
  );
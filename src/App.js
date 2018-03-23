import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom"

import Table from "./Table";
import Charts from "./Charts";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Table} />
          <Route path="/:tablename" component={Charts} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
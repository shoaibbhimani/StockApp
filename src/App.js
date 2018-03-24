import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Table from "./Table";
import Charts from "./Charts";
import "./App.css";

const mapStateToProps = state => {
  return {
    isLoading: !!Object.keys(state.stocks).length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData: data => {
      dispatch({
        type: "NEW_UPDATE",
        data: data
      });
    }
  };
};

class App extends Component {
  componentDidMount() {
    this.getConnectionWithSocket();
  }

  getConnectionWithSocket = () => {
    const stocksSocket = new WebSocket("ws://stocks.mnet.website");
    stocksSocket.onmessage = event => {
      var data = JSON.parse(event.data);
      this.props.getData(data);
    };
  };
  render() {
    const { isLoading } = this.props;
    return (
      <div>
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          <Switch>
            <Route exact path="/" component={Table} />
            <Route path="/:stockname" component={Charts} />
          </Switch>
        )}
      </div>
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));

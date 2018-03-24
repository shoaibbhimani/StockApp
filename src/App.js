import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Table from "./Table";
import Charts from "./Charts";

const mapStateToProps = state => {
  return {
    stocks: state.stocks,
    isLoading: !!Object.keys(state.stocks).length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData: data => {
      dispatch({
        type: "NEW_UPATES",
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
      var tickerTime = new Date();
      var data = JSON.parse(event.data);
      this.props.getData(data);
    };
  };
  render() {
    const { stocks, isLoading } = this.props;
    return (
      <div>
        {isLoading ? (
          "loading"
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

import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import Table from "./Table";
import Charts from "./Charts";
import "./App.css";

const Loader = styled.section`
  font-size: 21px;
  text-align: center;
  margin: 20px auto;
  font-weight: 300;
  font-family: "Open Sans", sans-serif;
`;

const mapStateToProps = state => {
  return {
    stocks: state.stocks
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
    const { stocks } = this.props;
    return (
      <div>
        {Object.keys(stocks).length ? (
          <Switch>
            <Route exact path="/" component={Table} />
            <Route path="/:stockname" component={Charts} />
          </Switch>
        ) : (
          <Loader>Loading...</Loader>
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

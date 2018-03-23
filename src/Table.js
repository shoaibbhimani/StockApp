import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import TableItem from "./TableItem";

class Table extends Component {
  state = {
    stocks: {},
    stocksDatasets: {}
  };

  componentDidMount() {
    this.getConnectionWithSocket();
  }

  getConnectionWithSocket = () => {
    const stocksSocket = new WebSocket("ws://stocks.mnet.website");
    stocksSocket.onmessage = event => {
      const { stocks, stocksDatasets } = this.state;
      var tickerTime = new Date();
      var data = JSON.parse(event.data);

      const new_stocks_list = {};
      const new_stocks_data_sets = {...stocksDatasets};

      data.forEach(datum => {
        var tickerId = datum[0];
        var tickerPrice = datum[1];
        new_stocks_list[tickerId] = tickerPrice;

        if (!new_stocks_data_sets[tickerId]) {
          new_stocks_data_sets[tickerId] = [];
        } else {
          new_stocks_data_sets[tickerId] = new_stocks_data_sets[
            tickerId
          ].concat(tickerPrice);
        }
      });

      this.setState({
        stocks: { ...stocks, ...new_stocks_list },
        stocksDatasets: { ...stocksDatasets, ...new_stocks_data_sets }
      });
    };
  };

  render() {
    const { stocks } = this.state;
    const stockKeys = Object.keys(this.state.stocks);
    return (
      <section className="row">
        <div className="col-sm-8 col-sm-offset-2">
          <table className="table">
            <thead>
              <tr>
                <th>Tricker</th> <th>Price</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {stockKeys.map((stock, index) => {
                return (
                  <TableItem
                    key={stock}
                    index={index + 1}
                    stock_name={stock}
                    stock_price={stocks[stock]}
                    data_sets={stocks[stock]["data_sets"]}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default Table;

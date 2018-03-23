import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import TableItem from "./TableItem";

class App extends Component {
  state = {
    stocks: {}
  };

  componentDidMount() {
    const stocksSocket = new WebSocket("ws://stocks.mnet.website");
    stocksSocket.onmessage = event => {
      const { stocks } = this.state;
      var tickerTime = new Date(); // // Time of the data update
      var data = JSON.parse(event.data);
      console.log("data", data);

      const results = data.reduce((prev, next) => {
        
        const data_sets = stocks[next[0]] ? stocks[next[0]]["data_sets"] : [];

        prev[next[0]] = {
          tricker: next[0],
          price: next[1],
          data_sets: data_sets.concat(next[1])
        } 

        return prev;
      }, stocks);

      this.setState({ stocks: results });
    };
  }

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
                    stock_price={stocks[stock]["price"]}
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

export default App;

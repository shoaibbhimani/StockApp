import React, { Component } from "react";
import { connect } from "react-redux";

import TableItem from "./TableItem";

const mapStateToProps = state => {
  return {
    stocks: state.stocks
  };
};

class Table extends Component {
  render() {
    const { stocks } = this.props;
    const stockKeys = Object.keys(stocks);
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

export default connect(mapStateToProps)(Table);

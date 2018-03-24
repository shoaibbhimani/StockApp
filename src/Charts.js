import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  const stock_name = ownProps.match.params.stockname;
  const active_stock = state.stocks[stock_name];
  return {
    stock: active_stock,
    stock_name
  };
};
class Charts extends Component {
  render() {
    const { stock_name, stock } = this.props;
    if (!stock) {
      return <Redirect to="/" />;
    }

    const data = {
      labels: [30, 60, 90, 120, 150, 180, 200, 230, 260, 290],
      datasets: [
        {
          label: stock_name,
          pointHitRadius: 10,
          data: stock.data_sets
        }
      ]
    };

    return (
      <div className="chart-wrapper">
        <Line
          data={data}
          width={300}
          height={250}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Charts);

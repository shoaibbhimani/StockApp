import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Charts extends Component {
  render() {
    const { stock_name, data_sets } = this.props  
    const data = {
        datasets: [
          {
            label: stock_name,
            pointHitRadius: 10,
            data: data_sets
          }
        ]
      };

    return (
      <div>
        <Line data={data} width={295} height={138} />
      </div>
    );
  }
}

export default Charts;

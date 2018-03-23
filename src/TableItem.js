import React, { Component } from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { NavLink } from "react-router-dom";

class TableItem extends Component {
  state = {
    isStockRising: null,
    backgroundColor: "",
    color: "#000",
    lastUpdate: new Date()
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.stock_price !== this.props.stock_price) {
      const isStockRising = nextProps.stock_price > this.props.stock_price;
      this.setState({
        isStockRising,
        backgroundColor: isStockRising ? "#00D594" : "#FF4500",
        color: "#fff",
        lastUpdate: new Date()
      });
    }
  }

  render() {
    const { stock_name, stock_price, index, data_sets } = this.props;
    const { isStockRising, backgroundColor, lastUpdate, color } = this.state;
  
    return (
      <tr>
        <td><NavLink to={`/${stock_name}`}>{stock_name}</NavLink></td>
        <td style={{ backgroundColor, color }}>{stock_price}</td>
        <td>{moment(lastUpdate).fromNow()}</td>
      </tr>
    );
  }
}

export default TableItem;

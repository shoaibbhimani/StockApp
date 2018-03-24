import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import styled from "styled-components";

const ChartWrapper = styled.section`
  width: 900px;
  height: 450px;
  margin: 0 auto;
`;

const BackButton = styled(NavLink)`
  display: inline-block;
  padding: 4px 4px;
  width: 120px;
  margin-top: 8px;
  font-weight: 300;
  text-align: center;
  border-radius: 21px;
  text-decoration: none;
  background: #00a6ef;
  color: white;
`;

const CurrentPrice = styled.section`
  text-align: center;
  font-size: 21px;
  font-weight: 300;
`;

const StockName = styled.section`
  font-weight: 300;
  text-align: center;
  font-size: 42px;
  margin-top: 7px;
  color: #1495ed;
`;

const Icon = styled.span`
  color: ${props => props.color};
`;

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
      <ChartWrapper>
        <BackButton to="/">Back</BackButton>
        <StockName>{stock_name}</StockName>
        <CurrentPrice>
          <Icon color={stock.backgroundColor}> {stock.icon} </Icon>
          {stock.price.toFixed(4)}
        </CurrentPrice>
        <Line data={data} width={600} height={300} />
      </ChartWrapper>
    );
  }
}

export default connect(mapStateToProps)(Charts);

import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import TableItem from "./TableItem";

const Container = styled.section`
  width: 80%;
  margin: 0 auto;
`;

const Menu = styled.section`
  box-shadow: rgba(191, 191, 191, 0.3) -1px 1px 4px 0px;
`;

const AppName = styled.section`
  font-size: 15px;
  text-align: center;
  padding: 10px;
  font-weight: 400;
  color: #1495ed;
`;

const MenuItem = styled.section`
  float: left;
  width: 31.333%;
  padding: 7px;
  text-align: center;
  font-size: 16px;
  background: white;
`;

const mapStateToProps = state => {
  return {
    stocks: state.stocks
  };
};

class TableList extends Component {
  render() {
    const { stocks } = this.props;
    const stockKeys = Object.keys(stocks);
    return (
      <Container>
        <AppName>(Live) Stocks App</AppName>
        <section>
          <Menu className="clearfix">
            <MenuItem>Tricker</MenuItem> <MenuItem>Price</MenuItem>
            <MenuItem>Last Updated</MenuItem>
          </Menu>
          <section>
            {stockKeys.map((stock, index) => {
              return (
                <TableItem
                  key={stock}
                  index={index + 1}
                  stockItem={stocks[stock]}
                  stock_name={stock}
                />
              );
            })}
          </section>
        </section>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(TableList);

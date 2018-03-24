import React, { Component } from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import * as types from "prop-types";

const StockItemGrid = styled.section`
  box-shadow: rgba(191, 191, 191, 0.09) 0px 2px 1px 0px;
`;

const GridItem = styled.section`
  width: 29.333%;
  float: left;
  padding: 17px;
  text-align: center;
  font-weight: 300;
  font-size: 14px;
`;

const Dot = styled.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  background: ${props => props.color};
  border-radius: 50%;
  margin-right: 3px;
`;

const Icon = styled.span`
  color: ${props => props.color};
`;

const Price = styled.span`
  display: inline-block;
  width: 79px;
`;

const Link = styled(NavLink)`
  text-decoration: none;
`;

class TableItem extends Component {
  render() {
    const { stock_name, stockItem } = this.props;

    return (
      <StockItemGrid className="clearfix">
        <GridItem>
          <Link to={`/${stock_name}`}>{stock_name}</Link>
        </GridItem>
        <GridItem>
          <Dot color={stockItem.backgroundColor} />
          <Price>{stockItem.price.toFixed(4)}</Price>
        </GridItem>
        <GridItem>{moment(stockItem.last_updated).fromNow()}</GridItem>
      </StockItemGrid>
    );
  }
}

TableItem.propTypes = {
  stock_name: types.string.isRequired,
  stockItem: types.object.isRequired
};

export default TableItem;

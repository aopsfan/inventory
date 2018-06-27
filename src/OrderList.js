import React, { Component } from 'react';
import Order from './Order';

const renderOrder = (order) => {
  return (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{Order.numberOfCases(order)}</td>
    </tr>
  )
}

export default class OrderList extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
          <th>ID</th>
          <th>Cases</th>
          </tr>
          {this.props.orders.map(renderOrder)}
        </tbody>
      </table>
    )
  }
}

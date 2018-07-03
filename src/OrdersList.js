import React from 'react';
import Order from './Order';

const renderOrder = (order) => {
  return (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{Order.numberOfCases(order)}</td>
    </tr>
  )
}

const OrdersList = ({ orders }) => (
  <table>
    <tbody>
      <tr>
      <th>ID</th>
      <th>Cases</th>
      </tr>
      { orders.map(renderOrder) }
    </tbody>
  </table>
);

export default OrdersList;

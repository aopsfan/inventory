import React from 'react';
import Order from './Order';
import withState from './Stater';

const renderOrder = order => {
  return (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{Order.numberOfCases(order)}</td>
    </tr>
  )
}

const OrdersList = props => (
  <table>
    <tbody>
      <tr>
      <th>ID</th>
      <th>Cases</th>
      </tr>
      { props.get.orders.map(renderOrder) }
    </tbody>
  </table>
);

export default withState(OrdersList);

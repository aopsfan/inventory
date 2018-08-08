import React from 'react';
import Order from '../model/Order';
import Stater from '../lib/Stater';
import R from '../lib/Ramda';
import { Link } from 'react-router-dom';

const renderOrder = R.curry((props, order, index) => {
  return (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{Order.numberOfCases(order)}</td>
      <td>
        <Link to={'/order/' + order.id}>Show</Link>
      </td>
      <td><button
        onClick={e => {
          e.preventDefault();
          props.set.orders(R.remove(index, 1));
        }}>
        Delete
      </button></td>
    </tr>
  )
});

const OrdersList = props => (
  <table>
    <tbody>
      <tr>
      <th>ID</th>
      <th>Cases</th>
      </tr>
      { props.get.orders.map(renderOrder(props)) }
    </tbody>
  </table>
);

export default Stater.withState(OrdersList);

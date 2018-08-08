import React from 'react';
import R from '../lib/Ramda';
import Stater from '../lib/Stater';
import Order from '../model/Order';

const orderLens = id => R.lensMatcher(R.propEq('id', id), undefined);
const orderForId = (id, orders) => R.view(orderLens(id), orders);
const thisOrder = props => orderForId(props.orderId, props.get.orders);

const renderLineItem = (props, li) => (
  <tr key={li.id}>
    <td>{li.id}</td>
    <td>{li.name}</td>
    <td>{li.description}</td>
    <td>{li.price}</td>
    <td>{li.qty}</td>
  </tr>
)

const ValidOrderDetail = props => (
  <table>
    <tbody>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Qty</th>
      </tr>
      {
        Order.zip(props.get.products, thisOrder(props)).map(li => {
          return renderLineItem(props, li);
        })
      }
    </tbody>
  </table>
);

const InvalidOrderDetail = props => (<div>Invalid Order</div>);

const OrderDetailR = R.ifElse(thisOrder, ValidOrderDetail, InvalidOrderDetail);

export { orderLens, orderForId, thisOrder };
export default Stater.withState(OrderDetailR);

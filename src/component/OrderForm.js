import React from 'react';
import Order from '../model/Order';
import R from '../lib/Ramda';
import Stater from '../lib/Stater';
import { Link, withRouter } from 'react-router-dom';

const goBack = ({ history }) => {
  history.push('/orders');
}

const submitOrder = props => {
  const order = Order.flatten(props.get.nextOrder);
  props.set.orders(R.append(order));
  props.set.nextOrder(prevState => {
    return Order.initial(prevState.id + 1);
  });

  goBack(props);
}

const renderLineItem = (props, li) => {
  return (
    <tr key={li.id}>
      <td>{li.id}</td>
      <td>{li.name}</td>
      <td>{li.description}</td>
      <td>{li.price}</td>
      <td><input type="number"
        value={li.qty}
        onChange={(e) => {
          const newQty = parseInt(e.target.value, 10);
          props.set.nextOrder(R.set(Order.qtyLens(li.id), newQty));
        }} /></td>
    </tr>
  )
}

const OrderForm = props => (
  <form onSubmit={e => {
    e.preventDefault();
    submitOrder(props);
  }}>
    <Link to="/orders">Cancel</Link>
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
          Order.form(props.get.products, props.get.nextOrder).map(li => {
            return renderLineItem(props, li);
          })
        }
      </tbody>
    </table>
    <input type="submit" value="Submit" />
  </form>
);

export default Stater.withState(withRouter(OrderForm));

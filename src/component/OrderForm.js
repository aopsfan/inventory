import React from 'react';
import Order from '../model/Order';
import R from '../lib/Ramda';
import withState from '../lib/Stater';
import { Link, withRouter } from 'react-router-dom';

const qtyLens = id => {
  return R.compose(
    Order.lineItemLens(id),
    R.lensProp('qty')
  );
}

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

const renderLineItem = (props, lineItem, qtyLens) => {
  return (
    <tr key={lineItem.id}>
      <td>{lineItem.id}</td>
      <td>{lineItem.name}</td>
      <td>{lineItem.description}</td>
      <td>{lineItem.price}</td>
      <td><input type="number"
        value={lineItem.qty}
        onChange={(e) => {
          props.set.nextOrder(R.set(qtyLens, parseInt(e.target.value, 10)));
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
          Order.zipLineItems(props.get.products, props.get.nextOrder).map((l) => {
            return renderLineItem(props, l, qtyLens(l.id));
          })
        }
      </tbody>
    </table>
    <input type="submit" value="Submit" />
  </form>
);

export default withState(withRouter(OrderForm));

import React, { Component } from 'react';
import Order from './Order';
import LineItem from './LineItem';
import R from './Ramda';
import { Link, withRouter } from 'react-router-dom';

const goBack = component => {
  component.props.history.push('/orders');
}

const submitOrder = component => {
  const order = Order.flatten(component.state.order);
  component.props.setLocalState(R.append(order));

  goBack(component);
}

const renderLineItem = (component, lineItem, qtyLens) => {
  return (
    <tr key={lineItem.id}>
      <td>{lineItem.id}</td>
      <td>{lineItem.name}</td>
      <td>{lineItem.description}</td>
      <td>{lineItem.price}</td>
      <td><input type="number"
        value={lineItem.qty}
        onChange={(e) => {
          component.setState(R.set(qtyLens, parseInt(e.target.value, 10)));
        }} /></td>
    </tr>
  )
}

const qtyLens = id => {
  return R.compose(
    R.lensProp('order'),
    Order.lineItemLens(id),
    R.lensProp('qty')
  );
}

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: Order.initial(0)
    }
  }

  render() {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        submitOrder(this);
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
              Order.zipLineItems(this.props.products, this.state.order).map((l) => {
                return renderLineItem(this, l, qtyLens(l.id));
              })
            }
          </tbody>
        </table>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default withRouter(OrderForm);

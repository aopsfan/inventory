import React, { Component } from 'react';
import Order from './Order';
import LineItem from './LineItem';
import R from './Ramda';

const submitOrder = (component, event) => {
  event.preventDefault();
  component.props.onSubmit(Order.flatten(component.state.order));
  component.setState((prevState) => {
    return {
      order: Order.initial(component.props.products, prevState.order.id + 1)
    };
  });
}

const renderLineItem = (component, { id, name, description, price, qty }, qtyLens) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td><input type="number"
        value={qty}
        onChange={(e) => {
          component.setState(R.set(qtyLens, parseInt(e.target.value, 10)));
        }} /></td>
    </tr>
  )
}

const qtyLens = (id) => {
  return R.compose(
    R.lensProp('order'),
    Order.lineItemLens(id),
    R.lensProp('qty')
  );
}

export default class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: Order.initial(0)
    }
  }

  render() {
    return (
      <form onSubmit={(e) => submitOrder(this, e)}>
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

import React, { Component } from 'react';
import Order from './Order';
import * as R from 'ramda';

const submitOrder = (component, event) => {
  event.preventDefault();
  component.props.onSubmit(Order.flatten(component.state.order));
  component.setState((prevState) => {
    return {
      order: Order.initial(component.props.products, prevState.order.id + 1)
    };
  });
}

const renderLineItem = (component, { product, qty }, qtyLens) => {
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td><input type="number"
        value={qty}
        onChange={(e) => {
          component.setState(R.set(qtyLens, parseInt(e.target.value, 10)))
        }} /></td>
    </tr>
  )
}

export default class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: Order.initial(props.products, 0)
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
              this.state.order.lineItems.map((l, i) => {
                const lens = R.lensPath(['order', 'lineItems', i, 'qty']);
                return renderLineItem(this, l, lens);
              })
            }
          </tbody>
        </table>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

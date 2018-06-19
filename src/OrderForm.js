import React, { Component } from 'react';
import LineItem from './LineItem';
import Order from './Order';

const submitOrder = (component, event) => {
  event.preventDefault();
  component.props.onSubmit(Order.order(component.state.lineItems));
}

const updateLineItem = (component, product, qty) => {
  component.setState((prevState) => {
    const partialLineItems = prevState.lineItems.map(li => {
      return li.product !== product;
    })

    const updatedLineItem = LineItem.lineItem(product, qty)

    return { lineItems: [ ...partialLineItems, updatedLineItem ] };
  })
}

const renderLineItem = (component, product) => {
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <input type="number"
        onChange={(e) => updateLineItem(component, product, e.target.value)} />
    </tr>
  )
}

export default class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineItems: []
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
            {this.props.products.map(p => renderLineItem(this, p))}
          </tbody>
        </table>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

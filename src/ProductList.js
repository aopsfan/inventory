import React, { Component } from 'react';
import * as R from 'ramda';

const renderProduct = R.curry((component, product, index) => {
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td><button
        onClick={e => {
          e.preventDefault();
          component.setState(R.over(R.lensProp('products'), R.drop(index)))
        }}>
        Delete
      </button></td>
    </tr>
  );
})

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.items
    }
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
          {this.state.products.map(renderProduct(this))}
        </tbody>
      </table>
    );
  }
}

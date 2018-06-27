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
          component.props.setLocalState(R.remove(index, 1));
        }}>
        Delete
      </button></td>
    </tr>
  );
})

export default class ProductList extends Component {
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
          {this.props.products.map(renderProduct(this))}
        </tbody>
      </table>
    );
  }
}

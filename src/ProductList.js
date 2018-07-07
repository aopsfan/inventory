import React from 'react';
import * as R from 'ramda';
import withState from './Stater';

const renderProduct = R.curry((props, product, index) => {
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td><button
        onClick={e => {
          e.preventDefault();
          props.set.products(R.remove(index, 1));
        }}>
        Delete
      </button></td>
    </tr>
  );
});

const ProductList = props => (
  <table>
    <tbody>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
      </tr>
      {props.get.products.map(renderProduct(props))}
    </tbody>
  </table>
);

export default withState(ProductList);

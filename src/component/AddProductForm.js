import React from 'react';
import Product from '../model/Product';
import withState from '../lib/Stater';
import R from '../lib/Ramda';

const AddProductForm = props => (
  <form onSubmit={e => {
    e.preventDefault();
    props.set.products(R.append(props.get.nextProduct));
    props.set.nextProduct(prevState => {
      return Product.initial(0);
    })
  }}>
    <label>ID:
      <input type="number"
        value={props.get.nextProduct.id}
        onChange={e => props.set.nextProduct(R.assoc('id', parseInt(e.target.value, 10)))} />
    </label>
    <label>Name:
      <input type="text"
        value={props.get.nextProduct.name}
        onChange={e => props.set.nextProduct(R.assoc('name', e.target.value))} />
    </label>
    <label>Description:
      <input type="text"
        value={props.get.nextProduct.description}
        onChange={e => props.set.nextProduct(R.assoc('description', e.target.value))} />
    </label>
    <label>Price:
      <input type="number"
        value={props.get.nextProduct.price}
        onChange={e => props.set.nextProduct(R.assoc('price', parseFloat(e.target.value, 10)))} />
    </label>
    <input type="submit" value="Submit" />
  </form>
);

export default withState(AddProductForm);

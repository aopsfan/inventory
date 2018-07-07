import React from 'react';
import ProductList from '../ProductList';
import AddProductForm from '../AddProductForm';
import withState from '../Stater';
import R from '../Ramda';

const ProductsR = props => (
  <div>
    <h3>Available Products</h3>
    <ProductList
      source={props.source}
      lenses={R.pick(['products'], props.lenses)} />
    <AddProductForm
      source={props.source}
      lenses={props.lenses} />
  </div>
);

export default withState(ProductsR);

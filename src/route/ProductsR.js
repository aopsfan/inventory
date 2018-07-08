import React from 'react';
import ProductList from '../component/ProductList';
import AddProductForm from '../component/AddProductForm';
import withState from '../lib/Stater';
import R from '../lib/Ramda';

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

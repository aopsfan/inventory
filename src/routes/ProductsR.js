import React from 'react';
import ProductList from '../ProductList';
import AddProductForm from '../AddProductForm';

const ProductsR = (props) => (
  <div>
    <h3>Available Products</h3>
    <ProductList {...props} />
    <AddProductForm setLocalState={props.setLocalState}/>
  </div>
);

export default ProductsR;

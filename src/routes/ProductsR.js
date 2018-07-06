import React from 'react';
import ProductList from '../ProductList';
import AddProductForm from '../AddProductForm';
import R from '../Ramda';

const setLocalState = R.curry((component, lens, f) => {
  component.setState(R.over(lens, f));
});

const withState = R.curry((component, props) => {
  const getProp = R.map(R.view(R.__, props.source.state), props.lenses);
  const setProp = R.map(setLocalState(props.source, R.__), props.lenses);

  const withStateProps = R.pipe(
    R.assoc('get', getProp),
    R.assoc('set', setProp),
  );

  return component(withStateProps(props));
});

const ProductsR = props => (
  <div>
    <h3>Available Products</h3>
    <ProductList {...props} />
    <AddProductForm setLocalState={props.set.products}/>
  </div>
);

export default withState(ProductsR);

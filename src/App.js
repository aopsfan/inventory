import React, { Component } from 'react';
import ProductList from './ProductList';
import AddProductForm from './AddProductForm';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import R from './Ramda';
import './App.css';

const productsLens = R.lensProp('products');
const ordersLens = R.lensProp('orders');

const localState = (component, lens) => {
  return R.view(lens, component.state);
}

const setLocalState = R.curry((component, lens, f) => {
  component.setState(R.over(lens, f));
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 3021,
          name: 'Brownies',
          description: '30 ct.',
          price: 19
        },
        {
          id: 1234,
          name: 'Cookies',
          description: '20 ct.',
          price: 16
        },
        {
          id: 930,
          name: 'Boxes',
          description: '1 ct.',
          price: 109
        },
        {
          id: 193,
          name: 'Candles',
          description: '200 ct.',
          price: 39
        }
      ],
      orders: []
    };
  }

  render() {
    return (
      <div className="App">
        <h3>Available Products</h3>
        <ProductList setLocalState={setLocalState(this, productsLens)} products={localState(this, productsLens)}/>
        <AddProductForm setLocalState={setLocalState(this, productsLens)}/>
        <h3>Orders</h3>
        <OrderList orders={localState(this, ordersLens)}></OrderList>
        <h3>Order Form</h3>
        <OrderForm setLocalState={setLocalState(this, ordersLens)} products={localState(this, productsLens)}></OrderForm>
      </div>
    );
  }
}

export default App;

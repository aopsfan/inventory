import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import OrdersR from './routes/OrdersR';
import ProductsR from './routes/ProductsR';

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
        { id: 3021, name: 'Brownies', description: '30 ct.', price: 19 },
        { id: 1234, name: 'Cookies', description: '20 ct.', price: 16 },
        { id: 930, name: 'Boxes', description: '1 ct.', price: 109 },
        { id: 193, name: 'Candles', description: '200 ct.', price: 39 }
      ],
      orders: []
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <Link to="/products">Products</Link>
            <Link to="/orders">Orders</Link>
          </nav>
          <div className="content">
            <Route exact path="/" render={() => (
              <h1>Welcome</h1>
            )}/>

            <Route exact path="/products" render={() => (
              <ProductsR
                setLocalState={setLocalState(this, productsLens)}
                products={localState(this, productsLens)} />
            )}/>

            <Route path="/orders" render={() => (
              <OrdersR
                setLocalState={setLocalState(this, ordersLens)}
                orders={localState(this, ordersLens)}
                products={localState(this, productsLens)}
                />
            )}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

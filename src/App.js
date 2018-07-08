import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import R from './lib/Ramda';

import OrdersR from './route/OrdersR';
import ProductsR from './route/ProductsR';

import Order from './model/Order';
import Product from './model/Product';

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
      nextProduct: Product.initial(0),
      orders: [],
      nextOrder: Order.initial(0)
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
                source={this}
                lenses={{
                  products: R.lensProp('products'),
                  nextProduct: R.lensProp('nextProduct')
                }} />
            )}/>

            <Route path="/orders" render={() => (
              <OrdersR
                source={this}
                lenses={{
                  products: R.lensProp('products'),
                  orders: R.lensProp('orders'),
                  nextOrder: R.lensProp('nextOrder')
                }} />
            )}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

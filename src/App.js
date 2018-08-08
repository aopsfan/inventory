import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import R from './lib/Ramda';
import Stater from './lib/Stater';

import OrdersR from './route/OrdersR';
import ProductsR from './route/ProductsR';
import OrderDetailR from './route/OrderDetailR';

import Order from './model/Order';
import Product from './model/Product';

class App extends Component {
  constructor(props) {
    super(props);

    const inventory = Stater.getState();

    if (inventory) {
      this.state = inventory;
    } else {
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

    this.lenses = {
      products: R.lensProp('products'),
      orders: R.lensProp('orders'),
      nextProduct: R.lensProp('nextProduct'),
      nextOrder: R.lensProp('nextOrder')
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
                lenses={R.pick(['products', 'nextProduct'], this.lenses)} />
            )}/>

            <Route path="/orders" render={() => (
              <OrdersR
                source={this}
                lenses={this.lenses} />
            )}/>

            <Route exact path="/order/:id" render={({ match }) => (
              <OrderDetailR
                source={this}
                lenses={R.pick(['orders', 'products'], this.lenses)}
                orderId={parseInt(match.params.id, 10)}
                />
            )} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

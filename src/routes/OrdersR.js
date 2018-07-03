import React from 'react';
import OrdersList from '../OrdersList';
import OrderForm from '../OrderForm';
import { Route, Link } from 'react-router-dom';

const OrdersR = (props) => (
  <div>
    <h3>Orders</h3>
    <OrdersList orders={props.orders} />

    <Route exact path="/orders" render={() => (
      <Link to="/orders/new">New Order</Link>
    )} />

    <Route exact path="/orders/new" render={() => (
      <OrderForm
        setLocalState={props.setLocalState}
        products={props.products}
        />
    )} />
  </div>
);

export default OrdersR;

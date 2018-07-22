import React from 'react';
import OrdersList from '../component/OrdersList';
import OrderForm from '../component/OrderForm';
import OrderDetail from '../component/OrderDetail';
import { Route, Link } from 'react-router-dom';
import withState from '../lib/Stater';
import R from '../lib/Ramda';

const OrdersR = props => (
  <div>
    <h3>Orders</h3>
    <OrdersList
      source={props.source}
      lenses={R.pick(['orders'], props.lenses)} />

    <Route exact path="/orders" render={() => (
      <Link to="/orders/new">New Order</Link>
    )} />

    <Route exact path="/orders/new" render={() => (
      <OrderForm
        source={props.source}
        lenses={props.lenses}
        />
    )} />

    <Route exact path="/orders/show/:id" render={({ match }) => (
      <OrderDetail
        source={props.source}
        lenses={R.pick(['orders', 'products'], props.lenses)}
        orderId={parseInt(match.params.id, 10)}
        />
    )} />

  </div>
);

export default withState(OrdersR);
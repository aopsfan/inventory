import React, { Component } from 'react';
import ProductList from './ProductList';
import AddProductForm from './AddProductForm';
import OrderList from './OrderList'
import OrderForm from './OrderForm'
import './App.css'

const addProduct = (component, product) => {
  component.setState((prevState) => {
    return { ...prevState, products: [ ...prevState.products, product ]};
  })
}

const addOrder = (component, order) => {
  component.setState((prevState) => {
    return { ...prevState, orders: [ ...prevState.orders, order ]};
  })
}

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
    console.log(this.state);
    return (
      <div className="App">
        <h3>Available Products</h3>
        <ProductList items={this.state.products}></ProductList>
        <AddProductForm onSubmit={(e) => addProduct(this, e)}></AddProductForm>
        <h3>Orders</h3>
        <OrderList orders={this.state.orders}></OrderList>
        <h3>Order Form</h3>
        <OrderForm products={this.state.products} onSubmit={e => addOrder(this, e)}></OrderForm>
      </div>
    );
  }
}

export default App;

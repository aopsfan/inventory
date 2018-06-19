import React, { Component } from 'react';

export default class ProductList extends Component {
  renderProduct({ id, name, description, price }) {
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{description}</td>
        <td>{price}</td>
      </tr>
    )
  }
  
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
          {this.props.items.map(this.renderProduct)}
        </tbody>
      </table>
    );
  }
}

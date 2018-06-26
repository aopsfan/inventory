import React, { Component } from 'react';

export default class AddProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      description: '',
      price: 0.0
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>ID:
          <input type="number"
            value={this.id}
            onChange={(e) => this.setState({ id: parseInt(e.target.value, 10) })} />
        </label>
        <label>Name:
          <input type="text"
            value={this.name}
            onChange={(e) => this.setState({ name: e.target.value })} />
        </label>
        <label>Description:
          <input type="text"
            value={this.description}
            onChange={(e) => this.setState({ description: e.target.value })} />
        </label>
        <label>Price:
          <input type="number"
            value={this.price}
            onChange={(e) => this.setState({ price: parseFloat(e.target.value, 10) })} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

import Order from './Order';

it('creates initial state', () => {
  const order = Order.initial([{}, {}], 10);
  expect(order).toEqual({
    id: 10,
    lineItems: [
      { product: {}, qty: 0 },
      { product: {}, qty: 0 }
    ]
  });
});

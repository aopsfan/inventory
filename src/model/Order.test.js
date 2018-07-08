import Order from './Order';

it('zips line items', () => {
  const order = {
    lineItems: [
      { productId: 1, qty: 1 },
      { productId: 14, qty: 3 }
    ]
  };
  const products = [
    { id: 1, name: 'Brownies' },
    { id: 7, name: 'Cookies' },
    { id: 14, name: 'Potatoes' }
  ];

  expect(Order.zipLineItems(products, order)).toEqual([
    { id: 1, name: 'Brownies', qty: 1 },
    { id: 7, name: 'Cookies', qty: 0 },
    { id: 14, name: 'Potatoes', qty: 3 }
  ]);
});

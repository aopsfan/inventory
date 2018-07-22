import Order from './Order';

it('zips products', () => {
  const order = {
    lineItems: [
      { id: 1, qty: 1 },
      { id: 14, qty: 3 }
    ]
  };
  const products = [
    { id: 1, name: 'Brownies' },
    { id: 7, name: 'Cookies' },
    { id: 14, name: 'Potatoes' }
  ];

  expect(Order.form(products, order)).toEqual([
    { id: 1, name: 'Brownies', qty: 1 },
    { id: 7, name: 'Cookies', qty: 0 },
    { id: 14, name: 'Potatoes', qty: 3 }
  ]);

  expect(Order.zip(products, order)).toEqual([
    { id: 1, name: 'Brownies', qty: 1 },
    { id: 14, name: 'Potatoes', qty: 3 }
  ]);
});

it('calculates total price', () => {
  const order = {
    lineItems: [
      { id: 1, qty: 3 },
      { id: 2, qty: 1 },
      { id: 3, qty: 1 }
    ]
  };
  const products = [
    { id: 1, price: 25 },
    { id: 2, price: 10 },
    { id: 3, price: 4 }
  ];

  expect(Order.price(products, order)).toEqual(89);
});

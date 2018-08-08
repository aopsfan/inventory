import { orderForId } from './OrderDetailR';

it('finds an order given an ID', () => {
  const orders = [
    { id: 0, hello: 'world' },
    { id: 3, hello: 'goodbye' }
  ];

  expect(orderForId(0, orders)).toEqual({
    id: 0,
    hello: 'world'
  });
});

import * as R from 'ramda';
import LineItem from './LineItem';

const initial = (products, id) => {
  return { lineItems: products.map(LineItem.initial), id };
}

const flatten = R.over(
  R.lensProp('lineItems'),
  R.filter(l => l.qty > 0)
);

const numberOfCases = R.pipe( // order
  R.prop('lineItems'),        // lineItems
  R.map(R.prop('qty')),       // quantities
  R.sum                       // sum of quantities
);

const totalPrice = R.pipe(  // order
  R.prop('lineItems'),      // line items
  R.map(LineItem.price),    // prices
  R.sum                     // total price
);

export default { initial, flatten, numberOfCases, totalPrice };

import R from '../lib/Ramda';
import LineItem from './LineItem';

const initial = (id) => {
  return { lineItems: [], id };
}

const lineItemLens = (productId) => {
  return R.compose(
    R.lensProp('lineItems'),
    R.lensMatcher(
      R.propEq('productId', productId),
      LineItem.initial(productId)
    )
  );
}

const zipLineItems = (products, { lineItems }) => {
  return products.map((product) => {
    const qty = R.pipe(                          // line items
      R.find(R.propEq('productId', product.id)), // line item OR undefined
      R.prop('qty'),                             // quantity OR undefined
      R.or(R.__, 0)                              // quantity OR 0
    );
    return R.assoc('qty', qty(lineItems), product);
  })
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

export default {
  initial, zipLineItems, flatten, numberOfCases, totalPrice, lineItemLens
};

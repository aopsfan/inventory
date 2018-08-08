import R from '../lib/Ramda';
import LineItem from './LineItem';

const initial = (id) => {
  return { lineItems: [], id };
}

const idMatcherLens = id => {
  return R.lensMatcher(
    R.propEq('id', id),
    LineItem.initial(id)
  );
}

const qtyLens = id => {
  return R.compose(
    R.lensProp('lineItems'),
    idMatcherLens(id),
    R.lensProp('qty')
  );
}

const form = (products, order) => {
  return products.map(product => {
    const qty = R.view(qtyLens(product.id), order);
    return R.assoc('qty', qty, product);
  });
}

const zip = (products, { lineItems }) => {
  return lineItems.map(li => {
    const product = R.view(idMatcherLens(li.id), products);
    return R.assoc('qty', li.qty, product);
  });
}

const price = R.pipe(      // products, order
  zip,                     // list of products with qty
  R.map(LineItem.price),   // list of prices
  R.sum                    // sum of prices
);

const flatten = R.over(
  R.lensProp('lineItems'),
  R.filter(l => l.qty > 0)
);

const numberOfCases = R.pipe( // order
  R.prop('lineItems'),        // lineItems
  R.map(R.prop('qty')),       // quantities
  R.sum                       // sum of quantities
);

export default {
  initial, qtyLens, form, zip, price, flatten, numberOfCases
};

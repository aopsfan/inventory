const add = (a, b) => a + b;

const order = (lineItems) => {
  return { lineItems: lineItems }
}

const numberOfCases = ({ lineItems }) => {
  return lineItems.map((i) => i.qty).reduce(add);
}

const totalPrice = ({ lineItems }) => {
  return lineItems.map((i) => i.price).reduce(add);
}

export default { order: order, numberOfCases: numberOfCases, totalPrice: totalPrice };

const initial = (product) => {
  return { product: product, qty: 0 };
}

const price = ({ product: { price }, qty }) => {
  return price * qty;
}

export default { initial, price };

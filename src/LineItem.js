const initial = (productId) => {
  return { productId, qty: 0 };
}

const price = ({ productId: { price }, qty }) => {
  return price * qty;
}

export default { initial, price };

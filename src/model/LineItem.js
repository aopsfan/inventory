const initial = id => {
  return { id, qty: 0 };
}

const price = ({ price, qty }) => {
  return price * qty;
}

export default { initial, price };

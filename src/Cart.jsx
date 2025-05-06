import { useFormat } from "./useFormat"

const intl = useFormat("en-US", "currency", "USD")

const Cart = ({cart, checkout}) => {
  let total = 0
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i]
    total += current.pizza.sizes[current.size]
  }
  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.pizza.name} ({item.size}) - {intl.format(item.pizza.sizes[item.size])}
          </li>
        ))}
        <li>Total: {intl.format(total)}</li>
        <button onClick={checkout}>Checkout</button>
      </ul>
    </div>
  )
}

export default Cart
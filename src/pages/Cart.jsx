import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'

function Cart() {
  const { cart, changeQuantity, removeFromCart } = useCart()

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is currently empty.</p>

        <Link to="/products" className="shop-button">
          Browse Products
        </Link>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <article className="cart-item" key={item.id}>
            <div className="cart-product">
              <span className="cart-emoji">{item.emoji}</span>

              <div>
                <h2>{item.name}</h2>
                <p>₹{item.price} / {item.unit}</p>
              </div>
            </div>

            <div className="quantity-controls">
              <button onClick={() => changeQuantity(item.id, -1)}>
                −
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => changeQuantity(item.id, 1)}>
                +
              </button>
            </div>

            <strong>
              ₹{item.price * item.quantity}
            </strong>

            <button
              className="remove-button"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: ₹{total}</h2>

        <Link to="/checkout" className="shop-button">
          Proceed to Checkout
        </Link>
      </div>
    </main>
  )
}

export default Cart
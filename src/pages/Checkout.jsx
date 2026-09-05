import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'

function Checkout() {
  const { cart } = useCart()

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <h1>Checkout</h1>
        <p>Your cart is empty. Add some products before checkout.</p>

        <Link to="/products" className="shop-button">
          Browse Products
        </Link>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <section className="checkout-header">
        <p className="small-title">LOCALGROCER</p>
        <h1>Checkout</h1>
        <p>Enter your delivery details to place your order.</p>
      </section>

      <section className="checkout-container">
        <form className="checkout-form">
          <h2>Delivery Address</h2>

          <label>
            Full Name
            <input
              type="text"
              placeholder="Enter your full name"
            />
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              placeholder="Enter your phone number"
            />
          </label>

          <label>
            Address
            <textarea
              placeholder="Enter your complete address"
              rows="4"
            ></textarea>
          </label>

          <label>
            City
            <input
              type="text"
              placeholder="Enter your city"
            />
          </label>

          <label>
            Pincode
            <input
              type="text"
              placeholder="Enter your pincode"
            />
          </label>

          <button type="submit" className="shop-button">
            Place Order
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="summary-item" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                ₹{item.price * item.quantity}
              </strong>
            </div>
          ))}

          <hr />

          <h2>Total: ₹{total}</h2>
        </aside>
      </section>
    </main>
  )
}

export default Checkout
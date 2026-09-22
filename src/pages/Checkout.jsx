
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../CartContext'
import { API_URL } from '../api'

function Checkout() {
  const navigate = useNavigate()

  const {
    cart,
    removeFromCart,
  } = useCart()

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')

    const token = localStorage.getItem(
      'localgrocer-token'
    )

    if (!token) {
      navigate('/login', {
        state: {
          from: '/checkout',
        },
      })

      return
    }

    if (cart.length === 0) {
      setError(
        'Your cart is empty. Please add a product before placing an order.'
      )

      return
    }

    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.pincode.trim()
    ) {
      setError(
        'Please fill in all delivery details.'
      )

      return
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      setError(
        'Please enter a valid 10-digit phone number.'
      )

      return
    }

    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      setError(
        'Please enter a valid 6-digit pincode.'
      )

      return
    }

    setLoading(true)

    try {
      const orderItems = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }))

      const response = await fetch(
  `${API_URL}/api/orders`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            items: orderItems,

            deliveryAddress: {
              fullName: formData.fullName.trim(),
              phone: formData.phone.trim(),
              address: formData.address.trim(),
              city: formData.city.trim(),
              pincode: formData.pincode.trim(),
            },
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Failed to place order'
        )
      }

      localStorage.setItem(
        'localgrocer-last-order',
        JSON.stringify(data.order)
      )

      cart.forEach((item) => {
        removeFromCart(item.id)
      })

      navigate('/order-confirmation', {
        replace: true,
      })
    } catch (error) {
      setError(
        error.message ||
        'Something went wrong while placing your order.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">

        <div className="cart-empty">

          <div className="cart-empty-icon">
            🛒
          </div>

          <h1>
            Your cart is empty
          </h1>

          <p>
            Add products to your cart before checking out.
          </p>

          <Link
            to="/products"
            className="hero-button"
          >
            Browse Products →
          </Link>

        </div>

      </main>
    )
  }

  return (
    <main className="checkout-page">

      <div className="checkout-header">

        <p className="section-eyebrow">
          COMPLETE YOUR ORDER
        </p>

        <h1>
          Checkout
        </h1>

        <p>
          Enter your delivery details and place your order.
        </p>

      </div>

      <div className="checkout-container">

        {/* DELIVERY FORM */}

        <section className="checkout-form">

          <h2>
            Delivery Details
          </h2>

          <form onSubmit={handleSubmit}>

            <label>
              Full Name

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </label>

            <label>
              Phone Number

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength="10"
                autoComplete="tel"
              />
            </label>

            <label>
              Delivery Address

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete delivery address"
                rows="4"
                autoComplete="street-address"
              />
            </label>

            <label>
              City

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                autoComplete="address-level2"
              />
            </label>

            <label>
              Pincode

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6-digit pincode"
                maxLength="6"
                inputMode="numeric"
                autoComplete="postal-code"
              />
            </label>

            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="shop-button"
              disabled={loading}
            >
              {loading
                ? 'Placing Order...'
                : 'Place Order'}
            </button>

          </form>

        </section>

        {/* ORDER SUMMARY */}

        <aside className="checkout-summary">

          <h2>
            Order Summary
          </h2>

          {cart.map((item) => (

            <div
              className="summary-item"
              key={item.id}
            >

              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{item.price * item.quantity}
              </span>

            </div>

          ))}

          <hr />

          <div className="checkout-total-row">
            <span>
              Total
            </span>

            <strong>
              ₹{totalAmount}
            </strong>
          </div>

        </aside>

      </div>

    </main>
  )
}

export default Checkout

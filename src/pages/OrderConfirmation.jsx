import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function OrderConfirmation() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const savedOrder = localStorage.getItem(
      'localgrocer-last-order'
    )

    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder))
      } catch (error) {
        setOrder(null)
      }
    }
  }, [])

  if (!order) {
    return (
      <main className="confirmation-page">
        <section className="confirmation-card">

          <div className="confirmation-icon">
            ✓
          </div>

          <p className="section-eyebrow">
            LOCALGROCER
          </p>

          <h1>
            Order information not found
          </h1>

          <p className="confirmation-text">
            Your order may already have been completed.
          </p>

          <Link
            to="/products"
            className="hero-button"
          >
            Continue Shopping →
          </Link>

        </section>
      </main>
    )
  }

  return (
    <main className="confirmation-page">

      <section className="confirmation-card">

        <div className="confirmation-icon">
          ✓
        </div>

        <p className="section-eyebrow">
          ORDER CONFIRMED
        </p>

        <h1>
          Thank you for your order!
        </h1>

        <p className="confirmation-text">
          Your grocery order has been placed successfully.
        </p>

        <div className="confirmation-order-id">
          <span>Order ID</span>

          <strong>
            #{order._id.slice(-8).toUpperCase()}
          </strong>
        </div>

        <div className="confirmation-details">

          <div className="confirmation-section">

            <h2>
              Order Summary
            </h2>

            {order.items.map((item) => (
              <div
                className="confirmation-item"
                key={item.productId}
              >

                <div>
                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    {item.quantity} × {item.unit}
                  </span>
                </div>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>

              </div>
            ))}

            <div className="confirmation-total">

              <span>
                Total
              </span>

              <strong>
                ₹{order.totalAmount}
              </strong>

            </div>

          </div>

          <div className="confirmation-section">

            <h2>
              Delivery Details
            </h2>

            <div className="delivery-details">

              <strong>
                {order.deliveryAddress.fullName}
              </strong>

              <span>
                {order.deliveryAddress.phone}
              </span>

              <span>
                {order.deliveryAddress.address}
              </span>

              <span>
                {order.deliveryAddress.city} -{' '}
                {order.deliveryAddress.pincode}
              </span>

            </div>

          </div>

          <div className="order-status">

            <span>
              Order Status
            </span>

            <strong>
              {order.status}
            </strong>

          </div>

        </div>

        <div className="confirmation-actions">

          <Link
            to="/products"
            className="hero-button"
          >
            Continue Shopping →
          </Link>

          <Link
            to="/"
            className="hero-secondary"
          >
            Back to Home
          </Link>

        </div>

      </section>

    </main>
  )
}

export default OrderConfirmation
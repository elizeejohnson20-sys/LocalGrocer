import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function MyOrders() {
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchOrders() {
      const token = localStorage.getItem(
        'localgrocer-token'
      )

      if (!token) {
        navigate('/login', {
          state: {
            from: '/my-orders',
          },
          replace: true,
        })

        return
      }

      try {
        const response = await fetch(
          'http://localhost:5000/api/orders',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 401) {
          localStorage.removeItem(
            'localgrocer-token'
          )

          localStorage.removeItem(
            'localgrocer-user'
          )

          window.dispatchEvent(
            new Event('localgrocer-auth-change')
          )

          navigate('/login', {
            state: {
              from: '/my-orders',
            },
            replace: true,
          })

          return
        }

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message ||
            'Failed to fetch orders'
          )
        }

        setOrders(data)
      } catch (error) {
        setError(
          error.message ||
          'Unable to load your orders.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [navigate])

  function formatDate(dateString) {
    return new Date(
      dateString
    ).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <main className="orders-page">
        <div className="orders-loading">
          Loading your orders...
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="orders-page">

        <div className="orders-header">
          <p className="section-eyebrow">
            YOUR ORDERS
          </p>

          <h1>
            My Orders
          </h1>
        </div>

        <div className="orders-message">
          {error}
        </div>

      </main>
    )
  }

  if (orders.length === 0) {
    return (
      <main className="orders-page">

        <div className="orders-header">
          <p className="section-eyebrow">
            YOUR ORDERS
          </p>

          <h1>
            My Orders
          </h1>

          <p>
            View your previous LocalGrocer orders here.
          </p>
        </div>

        <div className="orders-empty">

          <div className="orders-empty-icon">
            🛒
          </div>

          <h2>
            No orders yet
          </h2>

          <p>
            Your completed orders will appear here.
          </p>

          <Link
            to="/products"
            className="hero-button"
          >
            Start Shopping →
          </Link>

        </div>

      </main>
    )
  }

  return (
    <main className="orders-page">

      <div className="orders-header">

        <div>
          <p className="section-eyebrow">
            YOUR ORDERS
          </p>

          <h1>
            My Orders
          </h1>

          <p>
            Track your previous LocalGrocer orders and
            check their current status.
          </p>
        </div>

        <Link
          to="/products"
          className="continue-shopping"
        >
          Continue Shopping →
        </Link>

      </div>

      <div className="orders-list">

        {orders.map((order) => (

          <article
            className="order-card"
            key={order._id}
          >

            <div className="order-card-top">

              <div>
                <p className="order-label">
                  ORDER ID
                </p>

                <h2>
                  #{order._id
                    .slice(-8)
                    .toUpperCase()}
                </h2>

                <p className="order-date">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <span
                className={`order-status-badge status-${order.status}`}
              >
                {order.status.replaceAll(
                  '-',
                  ' '
                )}
              </span>

            </div>

            <div className="order-card-items">

              {order.items.map((item) => (

                <div
                  className="order-history-item"
                  key={`${order._id}-${item.productId}`}
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

            </div>

            <div className="order-card-bottom">

              <div className="order-delivery">

                <span>
                  Delivered to
                </span>

                <strong>
                  {order.deliveryAddress.city}
                </strong>

              </div>

              <div className="order-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{order.totalAmount}
                </strong>

              </div>

            </div>

          </article>

        ))}

      </div>

    </main>
  )
}

export default MyOrders
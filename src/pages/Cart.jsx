import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'

function Cart() {
  const {
    cart,
    removeFromCart,
    changeQuantity,
  } = useCart()

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  if (cart.length === 0) {
    return (
      <main className="cart-page">

        <div className="cart-empty">
          <div className="cart-empty-icon">
            🛒
          </div>

          <h1>
            Your cart is empty
          </h1>

          <p>
            Add some fresh groceries to get started.
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
    <main className="cart-page">

      <div className="cart-header">
        <div>
          <p className="section-eyebrow">
            YOUR SHOPPING CART
          </p>

          <h1>
            Your Cart
          </h1>

          <p>
            Review your items before checkout.
          </p>
        </div>

        <Link
          to="/products"
          className="continue-shopping"
        >
          ← Continue Shopping
        </Link>
      </div>

      <div className="cart-list">

        {cart.map((item) => (

          <article
            className="cart-item"
            key={item.id}
          >

            <div className="cart-product">

              <div className="cart-product-image">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                ) : (
                  <span className="cart-image-fallback">
                    🛒
                  </span>
                )}
              </div>

              <div className="cart-product-details">

                <p className="cart-product-category">
                  {item.category}
                </p>

                <h2>
                  {item.name}
                </h2>

                <p>
                  {item.unit}
                </p>

              </div>

            </div>

            <div className="cart-item-price">
              ₹{item.price}
            </div>

            <div className="quantity-controls">

              <button
                type="button"
                onClick={() =>
                  changeQuantity(item.id, -1)
                }
                aria-label={`Decrease ${item.name} quantity`}
              >
                −
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  changeQuantity(item.id, 1)
                }
                aria-label={`Increase ${item.name} quantity`}
              >
                +
              </button>

            </div>

            <div className="cart-item-total">
              ₹{item.price * item.quantity}
            </div>

            <button
              type="button"
              className="remove-button"
              onClick={() =>
                removeFromCart(item.id)
              }
            >
              Remove
            </button>

          </article>

        ))}

      </div>

      <div className="cart-summary">

        <div>
          <span>
            Total
          </span>

          <strong>
            ₹{cartTotal}
          </strong>
        </div>

        <Link
          to="/checkout"
          className="checkout-button"
        >
          Proceed to Checkout →
        </Link>

      </div>

    </main>
  )
}

export default Cart

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'

function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addedProductId, setAddedProductId] = useState(null)

  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          'http://localhost:5000/api/products'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()

        setProducts(data.slice(0, 6))
      } catch (error) {
        setError('Unable to load products right now.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  function handleAddToCart(product) {
  addToCart({
    ...product,
    id: product._id,
  })

  setAddedProductId(product._id)

  setTimeout(() => {
    setAddedProductId(null)
  }, 1200)
}

  if (loading) {
    return (
      <section className="featured-products">

        <div className="section-heading">
          <div>
            <p className="section-eyebrow">
              OUR PICKS FOR YOU
            </p>

            <h2>
              Featured Products
            </h2>
          </div>
        </div>

        <p className="products-message">
          Loading fresh products...
        </p>

      </section>
    )
  }

  if (error) {
    return (
      <section className="featured-products">

        <div className="section-heading">
          <div>
            <p className="section-eyebrow">
              OUR PICKS FOR YOU
            </p>

            <h2>
              Featured Products
            </h2>
          </div>
        </div>

        <p className="products-message error-message">
          {error}
        </p>

      </section>
    )
  }

  return (
    <section className="featured-products">

      <div className="section-heading">

        <div>
          <p className="section-eyebrow">
            OUR PICKS FOR YOU
          </p>

          <h2>
            Featured Products
          </h2>
        </div>

        <Link
          to="/products"
          className="view-all"
        >
          View All Products →
        </Link>

      </div>

      <div className="featured-product-grid">

        {products.map((product) => (

          <article
            className="featured-product-card"
            key={product._id}
          >

            <div className="featured-product-image">

              <img
                src={product.image}
                alt={product.name}
              />

              <button
                className="wishlist-button"
                type="button"
                aria-label={`Add ${product.name} to wishlist`}
              >
                ♡
              </button>

            </div>

            <div className="featured-product-info">

              <p className="featured-product-category">
                {product.category}
              </p>

              <h3>
                {product.name}
              </h3>

              <p className="featured-product-unit">
                {product.unit}
              </p>

              <div className="featured-product-bottom">

                <div className="product-price">
                  <strong>
                    ₹{product.price}
                  </strong>
                </div>

                <button
  type="button"
  className={
    addedProductId === product._id
      ? 'featured-add-button is-added'
      : 'featured-add-button'
  }
  onClick={() => handleAddToCart(product)}
>
  {addedProductId === product._id
    ? '✓ Added'
    : '🛒 Add'}
</button>
              </div>

            </div>

          </article>

        ))}

      </div>

    </section>
  )
}

export default FeaturedProducts


import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../CartContext'
import { API_URL } from '../api'

import fruitsVegetables from '../assets/categories/fruits-vegetables.jpg'
import dairyEggs from '../assets/categories/dairy-eggs.jpg'
import grainsStaples from '../assets/categories/grains-staples.jpg'
import snacksBeverages from '../assets/categories/snacks-beverages.jpg'
import household from '../assets/categories/household.jpg'
import personalCare from '../assets/categories/personal-care.jpg'

function Products() {
  const { addToCart } = useCart()

  const [searchParams, setSearchParams] = useSearchParams()

  const categoryFromUrl =
    searchParams.get('category') || 'All'

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(categoryFromUrl)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addedProductId, setAddedProductId] = useState(null)

  useEffect(() => {
    setCategory(categoryFromUrl)
  }, [categoryFromUrl])

  useEffect(() => {
    const timer = setTimeout(() => {
      async function fetchProducts() {
        try {
          setLoading(true)
          setError('')

          const params = new URLSearchParams()

          if (search.trim()) {
            params.append('search', search.trim())
          }

          if (category !== 'All') {
            params.append('category', category)
          }

          const queryString = params.toString()
          const response = await fetch(
  `${API_URL}/api/products${
    queryString ? `?${queryString}` : ''
  }`
)

          if (!response.ok) {
            throw new Error('Failed to fetch products')
          }

          const data = await response.json()

          setProducts(data)
        } catch (error) {
          setError(
            'Unable to load products right now. Please try again.'
          )
        } finally {
          setLoading(false)
        }
      }

      fetchProducts()
    }, 400)

    return () => clearTimeout(timer)
  }, [search, category])

  function handleCategoryChange(event) {
    const selectedCategory = event.target.value

    setCategory(selectedCategory)

    const newParams = new URLSearchParams(searchParams)

    if (selectedCategory === 'All') {
      newParams.delete('category')
    } else {
      newParams.set('category', selectedCategory)
    }

    setSearchParams(newParams)
  }

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

  return (
    <main className="products-page">

      {/* HEADER */}
      <section className="products-header">
        <p className="section-eyebrow">
          LOCALGROCER STORE
        </p>

        <h1>Fresh groceries for your home</h1>

        <p>
          Choose from everyday essentials available
          in your neighbourhood.
        </p>
      </section>

      {/* SEARCH + FILTER */}
      <section className="product-controls">

        <input
          type="text"
          placeholder="Search groceries..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="All">All Categories</option>
          <option value="Fruits & Vegetables">
            Fruits & Vegetables
          </option>
          <option value="Dairy & Eggs">
            Dairy & Eggs
          </option>
          <option value="Grains & Staples">
            Grains & Staples
          </option>
          <option value="Snacks & Beverages">
            Snacks & Beverages
          </option>
          <option value="Household">
            Household
          </option>
          <option value="Personal Care">
            Personal Care
          </option>
        </select>

      </section>

      {/* LOADING */}
      {loading && (
        <p className="no-products">
          Loading fresh products...
        </p>
      )}

      {/* ERROR */}
      {!loading && error && (
        <p className="no-products">
          {error}
        </p>
      )}

      {/* PRODUCTS */}
      {!loading && !error && products.length > 0 && (
        <section className="product-grid">

          {products.map((product) => (
            <article
              className="product-card"
              key={product._id}
            >

              <div className="product-image">
  <img
    src={product.image}
    alt={product.name}
    onError={(event) => {
      const fallbackImages = {
        'Fruits & Vegetables': fruitsVegetables,
        'Dairy & Eggs': dairyEggs,
        'Grains & Staples': grainsStaples,
        'Snacks & Beverages': snacksBeverages,
        Household: household,
        'Personal Care': personalCare,
      }

      event.currentTarget.src =
        fallbackImages[product.category] ||
        fruitsVegetables
    }}
  />
</div>

              <div className="product-info">

                <p className="product-category">
                  {product.category}
                </p>

                <h2>{product.name}</h2>

                <p>{product.unit}</p>

                <div className="product-bottom">

                  <strong>
                    ₹{product.price}
                  </strong>

                  <button
                    type="button"
                    className={
                      addedProductId === product._id
                        ? 'product-add-button is-added'
                        : 'product-add-button'
                    }
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    {addedProductId === product._id
                      ? '✓ Added'
                      : '🛒 Add to Cart'}
                  </button>

                </div>

              </div>

            </article>
          ))}

        </section>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && products.length === 0 && (
        <p className="no-products">
          No products found. Try another search.
        </p>
      )}

    </main>
  )
}

export default Products
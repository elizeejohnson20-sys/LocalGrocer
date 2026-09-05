import { useState } from 'react'
import { useCart } from '../CartContext'

const products = [
  { id: 1, name: 'Fresh Tomatoes', category: 'Vegetables', price: 40, unit: '1 kg', emoji: '🍅' },
  { id: 2, name: 'Potatoes', category: 'Vegetables', price: 35, unit: '1 kg', emoji: '🥔' },
  { id: 3, name: 'Apples', category: 'Fruits', price: 120, unit: '1 kg', emoji: '🍎' },
  { id: 4, name: 'Bananas', category: 'Fruits', price: 60, unit: '1 dozen', emoji: '🍌' },
  { id: 5, name: 'Fresh Milk', category: 'Dairy', price: 32, unit: '500 ml', emoji: '🥛' },
  { id: 6, name: 'Bread', category: 'Bakery', price: 45, unit: '1 pack', emoji: '🍞' },
]

function Products() {
    const { addToCart } = useCart()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || product.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <main className="products-page">
      <section className="products-header">
        <p className="small-title">LOCALGROCER STORE</p>
        <h1>Fresh groceries for your home</h1>
        <p>Choose from everyday essentials available in your neighbourhood.</p>
      </section>

      <section className="product-controls">
        <input
          type="text"
          placeholder="Search groceries..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
        </select>
      </section>

      <section className="product-grid">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image">
              {product.emoji}
            </div>

            <div className="product-info">
              <p className="product-category">{product.category}</p>
              <h2>{product.name}</h2>
              <p>{product.unit}</p>

              <div className="product-bottom">
                <strong>₹{product.price}</strong>
                <button onClick={() => addToCart(product)}>
                   Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {filteredProducts.length === 0 && (
        <p className="no-products">
          No products found. Try another search.
        </p>
      )}
    </main>
  )
}

export default Products
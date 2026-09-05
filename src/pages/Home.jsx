import { Link } from 'react-router-dom'

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="small-title">FRESH • LOCAL • CONVENIENT</p>

          <h1>
            Groceries from your
            <span> neighbourhood.</span>
          </h1>

          <p className="hero-text">
            Shop fresh groceries and everyday essentials
            from the comfort of your home.
          </p>

          <Link to="/products" className="shop-button">
            Shop Now →
          </Link>
        </div>
      </section>

      <section className="categories">
        <h2>Shop by Category</h2>

        <div className="category-grid">
          <div className="category-card">🥦 Vegetables</div>
          <div className="category-card">🍎 Fruits</div>
          <div className="category-card">🥛 Dairy</div>
          <div className="category-card">🍞 Bakery</div>
        </div>
      </section>

      <section className="features">
        <div>
          <h3>🛒 Easy Shopping</h3>
          <p>Find your everyday grocery needs quickly.</p>
        </div>

        <div>
          <h3>📦 Simple Ordering</h3>
          <p>Add products to your cart and checkout easily.</p>
        </div>

        <div>
          <h3>🏠 Local Delivery</h3>
          <p>Order groceries from your neighbourhood.</p>
        </div>
      </section>
    </main>
  )
}

export default Home
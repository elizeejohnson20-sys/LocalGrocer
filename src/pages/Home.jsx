
import { Link } from 'react-router-dom'
import { useState } from 'react'
import FeaturedProducts from '../components/FeaturedProducts'
import heroGroceries from '../assets/hero-groceries.jpg'

import fruitsVegetables from '../assets/categories/fruits-vegetables.jpg'
import dairyEggs from '../assets/categories/dairy-eggs.jpg'
import grainsStaples from '../assets/categories/grains-staples.jpg'
import snacksBeverages from '../assets/categories/snacks-beverages.jpg'
import household from '../assets/categories/household.jpg'
import personalCare from '../assets/categories/personal-care.jpg'

function Home() {
    const [hasLastOrder] = useState(
    Boolean(
      localStorage.getItem('localgrocer-last-order')
    )
  )
  return (
    <main>

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <p className="hero-eyebrow">
            YOUR NEIGHBOURHOOD GROCERY STORE
          </p>

          <h1>
            Fresh groceries,
            <br />
            <span>simply delivered.</span>
          </h1>

          <p className="hero-description">
            Shop fresh produce, daily essentials and
            everything you need from your local store.
          </p>

          <div className="hero-actions">

  <Link
    to="/products"
    className="hero-button"
  >
    Shop Groceries →
  </Link>

  <a
    href="#categories"
    className="hero-secondary"
  >
    View Categories
  </a>

  {hasLastOrder && (
    <Link
      to="/order-confirmation"
      className="hero-secondary"
    >
      View Last Order
    </Link>
  )}

</div>
          <div className="hero-trust-row">
            <span>✓ Fresh products</span>
            <span>✓ Local stores</span>
            <span>✓ Easy shopping</span>
          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-image-card">
            <img
              src={heroGroceries}
              alt="Fresh groceries"
            />
          </div>

        </div>

      </section>

     {/* CATEGORIES */}
<section
  className="categories"
  id="categories"
>

  <div className="section-heading">
    <div>
      <p className="section-eyebrow">
        SHOP WHAT YOU LOVE
      </p>

      <h2>
        Shop by Category
      </h2>
    </div>

    <Link
      to="/products"
      className="view-all"
    >
      View All →
    </Link>
  </div>

   <div className="category-grid">

  <Link
    to="/products?category=Fruits%20%26%20Vegetables"
    className="category-card"
  >
    <div className="category-image">
      <img
        src={fruitsVegetables}
        alt="Fruits and vegetables"
      />
    </div>

    <div className="category-info">
      <h3>Fruits & Vegetables</h3>
      <p>Fresh & healthy</p>
    </div>
  </Link>


  <Link
    to="/products?category=Dairy%20%26%20Eggs"
    className="category-card"
  >
    <div className="category-image">
      <img
        src={dairyEggs}
        alt="Dairy and eggs"
      />
    </div>

    <div className="category-info">
      <h3>Dairy & Eggs</h3>
      <p>Daily essentials</p>
    </div>
  </Link>


  <Link
    to="/products?category=Grains%20%26%20Staples"
    className="category-card"
  >
    <div className="category-image">
      <img
        src={grainsStaples}
        alt="Grains and staples"
      />
    </div>

    <div className="category-info">
      <h3>Grains & Staples</h3>
      <p>Kitchen basics</p>
    </div>
  </Link>


  <Link
    to="/products?category=Snacks%20%26%20Beverages"
    className="category-card"
  >
    <div className="category-image">
      <img
        src={snacksBeverages}
        alt="Snacks and beverages"
      />
    </div>

    <div className="category-info">
      <h3>Snacks & Beverages</h3>
      <p>Tasty favourites</p>
    </div>
  </Link>


  <Link
    to="/products?category=Household"
    className="category-card"
  >
    <div className="category-image">
      <img
        src={household}
        alt="Household essentials"
      />
    </div>

    <div className="category-info">
      <h3>Household</h3>
      <p>For every home</p>
    </div>
  </Link>


  <Link
    to="/products?category=Personal%20Care"
    className="category-card"
  >
    <div className="category-image">
      <img
        src={personalCare}
        alt="Personal care products"
      />
    </div>

    <div className="category-info">
      <h3>Personal Care</h3>
      <p>Care for yourself</p>
    </div>
  </Link>

</div>

</section>
      {/* FEATURED PRODUCTS */}
      <FeaturedProducts />

      {/* WHY LOCALGROCER */}
      <section className="why-localgrocer">

        <div className="why-content">

          <p className="section-eyebrow">
            WHY LOCALGROCER?
          </p>

          <h2>
            Your local store,
            <br />
            <span>right at your fingertips.</span>
          </h2>

          <p>
            We make everyday grocery shopping simple,
            convenient and closer to home.
          </p>

          <Link
            to="/products"
            className="hero-button"
          >
            Start Shopping →
          </Link>

        </div>

        <div className="why-features">

  <div className="why-card">

    <div className="why-icon">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z"
        />
      </svg>
    </div>

    <div>
      <h3>Fresh Products</h3>
      <p>
        Carefully selected groceries for your everyday needs.
      </p>
    </div>

  </div>


  <div className="why-card">

    <div className="why-icon">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
        />
      </svg>
    </div>

    <div>
      <h3>Easy Shopping</h3>
      <p>
        Find what you need quickly and order with ease.
      </p>
    </div>

  </div>


  <div className="why-card">

    <div className="why-icon">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="m3 11 9-7 9 7"
        />
        <path
          d="M5 10v9h14v-9"
        />
        <path
          d="M9 19v-5h6v5"
        />
      </svg>
    </div>

    <div>
      <h3>Local Convenience</h3>
      <p>
        Enjoy your neighbourhood grocery experience online.
      </p>
    </div>

  </div>


  <div className="why-card">

    <div className="why-icon">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M20.8 8.6c0 5.4-8.8 10.1-8.8 10.1S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z"
        />
      </svg>
    </div>

    <div>
      <h3>Support Local</h3>
      <p>
        Shop locally and help neighbourhood businesses grow.
      </p>
    </div>

  </div>

</div>

      </section>

    </main>
  )
}

export default Home


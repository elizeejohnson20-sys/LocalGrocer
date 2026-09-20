import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../CartContext'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  const { cart } = useCart()

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  useEffect(() => {
    function loadUser() {
      const savedUser = localStorage.getItem(
        'localgrocer-user'
      )

      setUser(
        savedUser
          ? JSON.parse(savedUser)
          : null
      )
    }

    loadUser()

    window.addEventListener(
      'localgrocer-auth-change',
      loadUser
    )

    return () => {
      window.removeEventListener(
        'localgrocer-auth-change',
        loadUser
      )
    }
  }, [])

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleLogout() {
    localStorage.removeItem(
      'localgrocer-token'
    )

    localStorage.removeItem(
      'localgrocer-user'
    )

    setUser(null)

    setMenuOpen(false)

    window.dispatchEvent(
      new Event('localgrocer-auth-change')
    )
  }

  return (
    <header className="navbar">

      <div className="navbar-container">

        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
        >
          <div className="brand-icon">
            <span>🌿</span>
          </div>

          <div className="brand-text">
            <strong>
              LocalGrocer
            </strong>

            <small>
              Fresh • Local • For You
            </small>
          </div>
        </Link>

        <div className="navbar-search">
          <span className="search-icon">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search for products, categories..."
          />
        </div>

        <nav className="desktop-nav">

          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/products">
            Products
          </NavLink>

         {!user ? (
  <NavLink to="/login">
    Login / Register
  </NavLink>
) : (
  <>
    <span className="user-greeting">
      Hi, {user.name}
    </span>

    <NavLink to="/my-orders">
      My Orders
    </NavLink>
  </>
)}
          {user && (
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          <Link
            to="/cart"
            className="cart-link"
          >
            <span>🛒</span>

            Cart

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </Link>

        </nav>

        <div className="mobile-actions">

          <Link
            to="/cart"
            className="mobile-cart"
          >
            🛒

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>

        </div>

      </div>

      {menuOpen && (
        <nav className="mobile-nav">

          <NavLink
            to="/"
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeMenu}
          >
            Products
          </NavLink>

         {!user ? (
  <NavLink
    to="/login"
    onClick={closeMenu}
  >
    Login / Register
  </NavLink>
) : (
  <>
    <span className="mobile-user">
      Hi, {user.name}
    </span>

    <NavLink
      to="/my-orders"
      onClick={closeMenu}
    >
      My Orders
    </NavLink>

    <button
      type="button"
      className="mobile-logout"
      onClick={handleLogout}
    >
      Logout
    </button>
  </>
)}

          <NavLink
            to="/cart"
            onClick={closeMenu}
          >
            Cart {cartCount > 0 && `(${cartCount})`}
          </NavLink>

        </nav>
      )}

    </header>
  )
}

export default Navbar
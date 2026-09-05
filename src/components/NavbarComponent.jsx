import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        🥦 LocalGrocer
      </div>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
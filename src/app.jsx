import { Routes, Route } from 'react-router-dom'
import Navbar from './components/NavbarComponent'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/order-confirmation"
          element={<OrderConfirmation />}
        />
      </Routes>
    </>
  )
}

export default App
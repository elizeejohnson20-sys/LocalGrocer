import { Routes, Route } from 'react-router-dom'
import Navbar from './components/NavbarComponent'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import MyOrders from './pages/MyOrders'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>
        <Route
          path="/order-confirmation"
          element={<OrderConfirmation />}
        />
         <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
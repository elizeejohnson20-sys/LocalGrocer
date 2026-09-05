import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('localgrocer-cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      )

      let updatedCart

      if (existingProduct) {
        updatedCart = currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        updatedCart = [...currentCart, { ...product, quantity: 1 }]
      }

      localStorage.setItem(
        'localgrocer-cart',
        JSON.stringify(updatedCart)
      )

      return updatedCart
    })
  }

  function removeFromCart(productId) {
    setCart((currentCart) => {
      const updatedCart = currentCart.filter(
        (item) => item.id !== productId
      )

      localStorage.setItem(
        'localgrocer-cart',
        JSON.stringify(updatedCart)
      )

      return updatedCart
    })
  }

  function changeQuantity(productId, amount) {
    setCart((currentCart) => {
      const updatedCart = currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)

      localStorage.setItem(
        'localgrocer-cart',
        JSON.stringify(updatedCart)
      )

      return updatedCart
    })
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
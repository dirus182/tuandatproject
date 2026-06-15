import type { CartItem, Product } from '../types/product'

const CART_STORAGE_KEY = 'webbanhngot.cart'

function readCart(): CartItem[] {
  const rawCart = window.localStorage.getItem(CART_STORAGE_KEY)

  if (!rawCart) {
    return []
  }

  try {
    return JSON.parse(rawCart) as CartItem[]
  } catch {
    return []
  }
}

function writeCart(cartItems: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  window.dispatchEvent(new Event('cart:changed'))
}

export function getCartItems(): CartItem[] {
  return readCart()
}

export function getCartCount(): number {
  return readCart().reduce((total, item) => total + item.quantity, 0)
}

export function addToCart(product: Product, quantity = 1): CartItem[] {
  const cartItems = readCart()
  const existingItem = cartItems.find((item) => item.product.id === product.id)

  const nextCart = existingItem
    ? cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, product, quantity: item.quantity + quantity }
          : item
      )
    : [...cartItems, { product, quantity }]

  writeCart(nextCart)
  return nextCart
}

export function updateCartItem(productId: string, delta: number): CartItem[] {
  const nextCart = readCart()
    .map((item) =>
      item.product.id === productId
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    )
    .filter((item) => item.quantity > 0)

  writeCart(nextCart)
  return nextCart
}

export function removeCartItem(productId: string): CartItem[] {
  const nextCart = readCart().filter((item) => item.product.id !== productId)
  writeCart(nextCart)
  return nextCart
}

export function clearCart(): CartItem[] {
  writeCart([])
  return []
}

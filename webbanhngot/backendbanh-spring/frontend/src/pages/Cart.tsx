import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { PRODUCTS } from '../constants/products'
import type { Product } from '../types/product'
import styles from './Cart.module.css'

export function CartPage() {
  const [cartItems, setCartItems] = useState<Array<{ product: Product; quantity: number }>>(
    PRODUCTS.slice(0, 2).map((p) => ({ product: p, quantity: 1 }))
  )

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const handleRemove = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.product.id !== productId))
  }

  return (
    <div className={styles.page}>
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link to="/">HOME</Link> &gt; <span>YOUR SELECTION</span>
        </div>
      </div>

      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 className={styles.heading}>Your Selection</h1>
        <p className={styles.subtitle}>Review your artisanal treats before checkout.</p>

        {cartItems.length > 0 ? (
          <div className={styles.cartLayout}>
            {/* Cart Items */}
            <div className={styles.cartItems}>
              {cartItems.map((item) => (
                <div key={item.product.id} className={styles.cartItem}>
                  {/* Product Image */}
                  <img src={item.product.image} alt={item.product.name} className={styles.itemImage} />

                  {/* Product Details */}
                  <div className={styles.itemDetails}>
                    <h3>{item.product.name}</h3>
                    <p className={styles.itemCategory}>{item.product.category}</p>
                    {item.product.flavor && (
                      <p className={styles.itemAttribute}>
                        <strong>Flavor:</strong> {item.product.flavor[0]}
                      </p>
                    )}
                    {item.product.description && (
                      <p className={styles.itemDesc}>{item.product.description}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className={styles.itemPrice}>
                    <span className={styles.price}>${(item.product.price * item.quantity).toFixed(2)}</span>
                    <span className={styles.unitPrice}>
                      ${item.product.price.toFixed(2)} each
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className={styles.quantity}>
                    <button onClick={() => handleUpdateQuantity(item.product.id, -1)}>
                      <MinusOutlined />
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => handleUpdateQuantity(item.product.id, 1)}>
                      <PlusOutlined />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(item.product.id)}
                    title="Remove from cart"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className={styles.orderSummary}>
              <div className={styles.summaryCard}>
                <h3>Order Summary</h3>

                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span className={styles.free}>Free</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="btn-primary" style={{ width: '100%' }}>
                  Proceed to Checkout →
                </button>

                <button className="btn-secondary" style={{ width: '100%', marginTop: 'var(--spacing-md)' }}>
                  Continue Shopping
                </button>

                {/* Baker's Note */}
                <div className={styles.bakerNote}>
                  <h4>🍞 THE BAKER'S NOTE</h4>
                  <p>
                    The sourdough peaks in flavor 24 hours after baking. We recommend storing it in a
                    paper bag at room temperature to preserve the craft's texture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.emptyCart}>
            <p>Your cart is empty. Start selecting artisanal treats!</p>
            <Link to="/collections" className="btn-primary">
              Browse Collections
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  )
}






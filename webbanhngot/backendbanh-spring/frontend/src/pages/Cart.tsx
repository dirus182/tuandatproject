import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { clearCart, getCartItems, removeCartItem, updateCartItem } from '../services/cartService'
import {
  buildCheckoutPayload,
  createCheckout,
  type CheckoutCustomer,
  type CheckoutPayload,
} from '../services/checkoutService'
import type { CartItem } from '../types/product'
import styles from './Cart.module.css'

export function CartPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems)
  const [customer, setCustomer] = useState<CheckoutCustomer>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<CheckoutPayload['paymentMethod']>('cash')
  const [checkoutStatus, setCheckoutStatus] = useState<string>()
  const [checkoutError, setCheckoutError] = useState<string>()
  const [submitting, setSubmitting] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(updateCartItem(productId, delta))
  }

  const handleRemove = (productId: string) => {
    setCartItems(removeCartItem(productId))
  }

  const handleCustomerChange = (field: keyof CheckoutCustomer, value: string) => {
    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [field]: value,
    }))
  }

  const handleCheckout = async () => {
    const hasMissingCustomerInfo = Object.values(customer).some((value) => !value.trim())
    const outOfStockItem = cartItems.find(
      (item) => item.product.stockQuantity !== undefined && item.product.stockQuantity <= 0
    )

    if (hasMissingCustomerInfo) {
      setCheckoutStatus(undefined)
      setCheckoutError('Please fill in all customer information before checkout.')
      return
    }

    if (outOfStockItem) {
      setCheckoutStatus(undefined)
      setCheckoutError(`${outOfStockItem.product.name} is out of stock. Please remove it from your cart.`)
      return
    }

    setSubmitting(true)
    setCheckoutError(undefined)
    setCheckoutStatus(undefined)

    try {
      const payload = buildCheckoutPayload(customer, cartItems, total, paymentMethod)
      const response = await createCheckout(payload)
      setCartItems(clearCart())
      setCheckoutStatus(`Order #${response.orderId} created successfully.`)
      navigate('/checkout/success', {
        state: {
          orderId: response.orderId,
          totalPrice: response.totalPrice,
          paymentMethod: response.paymentMethod,
          customer,
        },
      })
    } catch (err) {
      console.error('Checkout failed:', err)
      const errorMessage =
        err instanceof Error ? err.message : 'Checkout failed. Please check your information and try again.'
      setCheckoutError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <Header cartCount={cartCount} />

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
            <div className={styles.cartItems}>
              {cartItems.map((item) => (
                <div key={item.product.id} className={styles.cartItem}>
                  <img src={item.product.image} alt={item.product.name} className={styles.itemImage} />

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

                  <div className={styles.itemPrice}>
                    <span className={styles.price}>${(item.product.price * item.quantity).toFixed(2)}</span>
                    <span className={styles.unitPrice}>${item.product.price.toFixed(2)} each</span>
                  </div>

                  <div className={styles.quantity}>
                    <button onClick={() => handleUpdateQuantity(item.product.id, -1)}>
                      <MinusOutlined />
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => handleUpdateQuantity(item.product.id, 1)}>
                      <PlusOutlined />
                    </button>
                  </div>

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

                <div className={styles.checkoutForm}>
                  <input
                    value={customer.firstName}
                    onChange={(event) => handleCustomerChange('firstName', event.target.value)}
                    placeholder="First name"
                  />
                  <input
                    value={customer.lastName}
                    onChange={(event) => handleCustomerChange('lastName', event.target.value)}
                    placeholder="Last name"
                  />
                  <input
                    value={customer.email}
                    onChange={(event) => handleCustomerChange('email', event.target.value)}
                    placeholder="Email"
                    type="email"
                  />
                  <input
                    value={customer.phoneNumber}
                    onChange={(event) => handleCustomerChange('phoneNumber', event.target.value)}
                    placeholder="Phone number"
                  />
                  <textarea
                    value={customer.address}
                    onChange={(event) => handleCustomerChange('address', event.target.value)}
                    placeholder="Delivery address"
                    rows={3}
                  />
                  <select
                    value={paymentMethod}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value as CheckoutPayload['paymentMethod'])
                    }
                  >
                    <option value="cash">Cash</option>
                    <option value="credit_card">Credit card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                {checkoutStatus && <p className={styles.checkoutSuccess}>{checkoutStatus}</p>}
                {checkoutError && <p className={styles.checkoutError}>{checkoutError}</p>}

                <button
                  className="btn-primary"
                  style={{ width: '100%' }}
                  onClick={handleCheckout}
                  disabled={submitting}
                >
                  {submitting ? 'Creating order...' : 'Proceed to Checkout'}
                </button>

                <Link
                  to="/collections"
                  className="btn-secondary"
                  style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
                >
                  Continue Shopping
                </Link>

                <div className={styles.bakerNote}>
                  <h4>THE BAKER'S NOTE</h4>
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
            {checkoutStatus ? (
              <p>{checkoutStatus}</p>
            ) : (
              <p>Your cart is empty. Start selecting artisanal treats!</p>
            )}
            <Link to="/collections" className="btn-primary">
              Browse Collections
            </Link>
          </div>
        )}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  )
}

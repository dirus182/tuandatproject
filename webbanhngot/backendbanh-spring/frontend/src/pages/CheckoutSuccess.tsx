import { Link, useLocation } from 'react-router-dom'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import styles from './CheckoutSuccess.module.css'

type CheckoutState = {
  orderId?: number
  totalPrice?: number
  paymentMethod?: string
  customer?: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    address: string
  }
}

export function CheckoutSuccessPage() {
  const location = useLocation()
  const state = (location.state || {}) as CheckoutState
  const customerName = state.customer
    ? `${state.customer.firstName} ${state.customer.lastName}`.trim()
    : 'Guest'

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.panel}>
          <div className={styles.iconWrap}>
            <CheckCircleOutlined />
          </div>

          <p className={styles.eyebrow}>Checkout completed</p>
          <h1>Order created successfully</h1>
          <p className={styles.subtitle}>
            Thank you, {customerName}. Your bakery order has been saved to the backend.
          </p>

          <div className={styles.details}>
            <div>
              <span>Order ID</span>
              <strong>{state.orderId ?? 'Pending'}</strong>
            </div>
            <div>
              <span>Total</span>
              <strong>{state.totalPrice !== undefined ? `$${state.totalPrice.toFixed(2)}` : 'Pending'}</strong>
            </div>
            <div>
              <span>Payment method</span>
              <strong>{state.paymentMethod ?? 'cash'}</strong>
            </div>
            <div>
              <span>Customer email</span>
              <strong>{state.customer?.email ?? 'Not provided'}</strong>
            </div>
          </div>

          <div className={styles.actions}>
            <Link to="/collections" className="btn-primary">
              Continue Shopping
            </Link>
            <Link to="/" className="btn-secondary">
              Back Home
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

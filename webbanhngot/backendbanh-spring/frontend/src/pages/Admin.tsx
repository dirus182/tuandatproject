import { Link } from 'react-router-dom'
import { Header, Footer } from '../components'
import styles from './Admin.module.css'

export function AdminPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.container}>
        <h1>Admin Dashboard</h1>
        <p>Quick access to administration modules.</p>
        <div className={styles.grid}>
          <Link className={styles.card} to="/admin/products">Products</Link>
          <Link className={styles.card} to="/admin/orders">Orders</Link>
          <Link className={styles.card} to="/admin/customers">Customers</Link>
          <Link className={styles.card} to="/admin/reviews">Reviews</Link>
          <Link className={styles.card} to="/admin/options">Options</Link>
          <Link className={styles.card} to="/admin/payments">Payments</Link>
          <Link className={styles.card} to="/admin/order-details">Order Details</Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AdminPage


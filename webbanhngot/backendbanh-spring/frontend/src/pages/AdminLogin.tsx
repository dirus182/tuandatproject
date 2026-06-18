import type { FormEvent } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Header, Footer } from '../components'
import { loginAdmin } from '../services/adminAuthService'
import styles from './AdminLogin.module.css'

interface LoginLocationState {
  from?: string
}

export function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LoginLocationState | null
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!loginAdmin(username, password)) {
      setError('Username or password is incorrect.')
      return
    }

    navigate(state?.from ?? '/admin', { replace: true })
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.container}>
        <section className={styles.panel}>
          <h1 className={styles.title}>Admin Login</h1>
          <p className={styles.subtitle}>Sign in to manage products, orders, customers, payments, options, and reviews.</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              Username
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
              />
            </label>

            <label className={styles.field}>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </label>

            {error && <p className={styles.error}>{error}</p>}

            <button className={styles.submit} type="submit">Login</button>
          </form>

          <p className={styles.hint}>Demo account: postgres / admin</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default AdminLoginPage

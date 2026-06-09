import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCartOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons'
import { NAV_LINKS } from '../constants/products'
import styles from './Header.module.css'

export interface HeaderProps {
  cartCount?: number
}

export function Header({ cartCount = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleNavClick = (link: string) => {
    setIsMenuOpen(false)
    const linkLower = link.toLowerCase()
    if (linkLower === 'shop') navigate('/collections')
    else if (linkLower === 'collections') navigate('/collections')
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>L'Artisan Boulangerie</h2>
          </Link>
        </div>

        {/* Navigation */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className={styles.navLink}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                font: 'inherit',
              }}
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Search">
            <SearchOutlined />
          </button>
          <button
            className={styles.iconBtn}
            onClick={() => navigate('/cart')}
            aria-label="Shopping cart"
          >
            <ShoppingCartOutlined />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>
          <button className={styles.iconBtn} aria-label="User account">
            <UserOutlined />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className={styles.menuToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}







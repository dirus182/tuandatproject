import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Column 1: About */}
          <div className={styles.column}>
            <h3>L'Artisan Boulangerie</h3>
            <p>Handcrafting moments of sweetness with premium ingredients and dedication.</p>
          </div>

          {/* Column 2: Experience */}
          <div className={styles.column}>
            <h4>Experience</h4>
            <ul>
              <li>
                <Link to="/collections">Seasonal Menu</Link>
              </li>
              <li>
                <Link to="/collections">Collections</Link>
              </li>
              <li>
                <a href="#workshops">Workshops</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className={styles.column}>
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#shipping">Shipping & Returns</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className={styles.column}>
            <h4>Connect</h4>
            <div className={styles.socialLinks}>
              <a href="#facebook" aria-label="Facebook">
                <FacebookOutlined />
              </a>
              <a href="#instagram" aria-label="Instagram">
                <InstagramOutlined />
              </a>
              <a href="#twitter" aria-label="Twitter">
                <TwitterOutlined />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>&copy; 2024 L'Artisan Boulangerie. Crafted with devotion.</p>
        </div>
      </div>
    </footer>
  )
}




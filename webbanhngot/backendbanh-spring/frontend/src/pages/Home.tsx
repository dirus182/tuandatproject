import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ProductCard } from '../components/ProductCard'
import { PRODUCTS, BAKER_NOTE, BAKER_NOTE_CONTENT } from '../constants/products'
import { getProducts } from '../services/productService'
import { addToCart, getCartCount } from '../services/cartService'
import type { Product } from '../types/product'
import styles from './Home.module.css'

export function HomePage() {
  const [cartCount, setCartCount] = useState(getCartCount)
  const [products, setProducts] = useState<Product[]>(PRODUCTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      setError(undefined)

      try {
        const apiProducts = await getProducts()
        if (apiProducts.length > 0) {
          setProducts(apiProducts)
        }
      } catch (err) {
        console.error('Failed to load backend products:', err)
        setError('Unable to load backend products. Showing demo products instead.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    setCartCount(getCartCount())
  }

  const featuredProducts = products.slice(0, 4)

  return (
    <div className={styles.page}>
      <Header cartCount={cartCount} />

      {loading && (
        <div className={styles.statusBanner}>
          Loading products from the backend...
        </div>
      )}

      {error && (
        <div className={styles.statusBannerError}>
          {error}
        </div>
      )}

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop"
            alt="Artisan Boulangerie"
            className={styles.heroImage}
          />
          <div className={styles.heroText}>
            <h1>Trang chủ - L'Artisan Boulangerie</h1>
            <p>Handcrafted artisan breads and pastries, made fresh daily with love and premium ingredients.</p>
            <Link to="/collections" className="btn-primary">
              Explore Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featured}>
        <div className="container">
          <h2>Our Signature Collection</h2>
          <p className={styles.subtitle}>Curated collection for discerning sweet tooths</p>
          <div className={`${styles.grid} grid grid-cols-4`}>
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Baker's Note */}
      <section className={styles.bakerNote}>
        <div className="container">
          <div className={styles.bakerNoteContent}>
            <div className={styles.bakerNoteImage}>
              <img
                src="/products/defaultbakery.jpg"
                alt="Baker"
              />
            </div>
            <div className={styles.bakerNoteText}>
              <h3>{BAKER_NOTE}</h3>
              <p>{BAKER_NOTE_CONTENT}</p>
              <Link to="/collections" className="btn-secondary" style={{ display: 'inline-flex' }}>
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* More Products */}
      <section className={styles.allProducts}>
        <div className="container">
          <h2>You Might Also Like</h2>
          <p className={styles.subtitle}>Curated pairing for your sweet tooth</p>
          <div className={`${styles.grid} grid grid-cols-4`}>
            {products.slice(2, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          <div className={styles.viewMore}>
            <Link to="/collections" className="btn-secondary">
              View All Collections
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}






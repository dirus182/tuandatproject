import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ProductCard } from '../components/ProductCard'
import { PRODUCTS, CATEGORIES, FLAVOR_OPTIONS, PRICE_RANGES } from '../constants/products'
import type { Product } from '../types/product'
import styles from './Collections.module.css'

export function CollectionsPage() {
  const [cart, setCart] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('popularity')

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product])
  }

  // Filtered products
  const filteredProducts = useMemo(() => {
    let filtered = [...PRODUCTS]

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Flavor filter
    if (selectedFlavors.length > 0) {
      filtered = filtered.filter(
        (p) => p.flavor && selectedFlavors.some((f) => p.flavor!.includes(f))
      )
    }

    // Price filter
    if (selectedPriceRange) {
      const range = PRICE_RANGES.find((r) => r.label === selectedPriceRange)
      if (range) {
        filtered = filtered.filter((p) => p.price >= range.min && p.price <= range.max)
      }
    }

    // Sorting
    if (sortBy === 'popularity') {
      filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    return filtered
  }, [selectedCategory, selectedFlavors, selectedPriceRange, sortBy])

  const toggleFlavor = (flavor: string) => {
    setSelectedFlavors((prev) =>
      prev.includes(flavor) ? prev.filter((f) => f !== flavor) : [...prev, flavor]
    )
  }

  return (
    <div className={styles.page}>
      <Header cartCount={cart.length} />

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link to="/">SHOP</Link> &gt; <Link to="/collections">COLLECTIONS</Link> &gt;{' '}
          <span>ARTISAN COLLECTIONS</span>
        </div>
      </div>

      <div className={styles.container}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <h3>Categories</h3>
          <div className={styles.filterGroup}>
            <button
              className={`${styles.filterBtn} ${!selectedCategory ? styles.active : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              All Products
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                className={`${styles.filterBtn} ${selectedCategory === cat.value ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          <h3>Flavor</h3>
          <div className={styles.filterGroup}>
            {FLAVOR_OPTIONS.map((flavor) => (
              <label key={flavor} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={selectedFlavors.includes(flavor)}
                  onChange={() => toggleFlavor(flavor)}
                />
                <span>{flavor}</span>
              </label>
            ))}
          </div>

          <h3>Price Range</h3>
          <div className={styles.filterGroup}>
            {PRICE_RANGES.map((range) => (
              <label key={range.label} className={styles.radio}>
                <input
                  type="radio"
                  name="price"
                  checked={selectedPriceRange === range.label}
                  onChange={() => setSelectedPriceRange(range.label)}
                />
                <span>{range.label}</span>
              </label>
            ))}
            <button
              className={styles.clearBtn}
              onClick={() => setSelectedCategory(null)}
            >
              Clear Filters
            </button>
          </div>

          {/* Baker's Note Box */}
          <div className={styles.bakerNoteBox}>
            <h4>🍞 Baker's Note</h4>
            <p>Our sourdough peaks in flavor 24 hours after baking. We recommend storing it in a paper bag at room temperature.</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h1>Artisan Collections</h1>
              <p>Showing {filteredProducts.length} hand-crafted treats</p>
            </div>
            <div className={styles.sort}>
              <label>Sort By: Popularity</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`${styles.grid} grid grid-cols-3`}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className={styles.noProducts}>
              <p>No products found. Try adjusting your filters.</p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}


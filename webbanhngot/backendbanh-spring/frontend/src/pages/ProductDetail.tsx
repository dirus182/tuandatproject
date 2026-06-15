import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ReviewCard } from '../components/ReviewCard'
import { ProductCard } from '../components/ProductCard'
import { PRODUCTS, REVIEWS } from '../constants/products'
import { addToCart, getCartCount } from '../services/cartService'
import { getProductById, getProducts } from '../services/productService'
import type { Product } from '../types/product'
import { StarFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './ProductDetail.module.css'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [cartCount, setCartCount] = useState(getCartCount)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product>(PRODUCTS.find((p) => p.id === id) || PRODUCTS[0])
  const [relatedProducts, setRelatedProducts] = useState<Product[]>(
    PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    async function loadProduct() {
      if (!id) {
        return
      }

      setLoading(true)
      setError(undefined)

      try {
        const [apiProduct, apiProducts] = await Promise.all([
          getProductById(id),
          getProducts(),
        ])
        const nextProduct = apiProduct || PRODUCTS.find((p) => p.id === id) || PRODUCTS[0]
        const nextRelatedProducts = (apiProducts.length > 0 ? apiProducts : PRODUCTS)
          .filter((p) => p.id !== nextProduct.id)
          .slice(0, 4)

        setProduct(nextProduct)
        setRelatedProducts(nextRelatedProducts)
      } catch (err) {
        console.error('Failed to load backend product:', err)
        setError('Unable to load backend product. Showing demo product instead.')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setCartCount(getCartCount())
    setQuantity(1)
  }

  const handleQuantityChange = (change: number) => {
    const newQty = Math.max(1, quantity + change)
    setQuantity(newQty)
  }

  return (
    <div className={styles.page}>
      <Header cartCount={cartCount} />

      {loading && (
        <div className="container" style={{ paddingTop: '16px' }}>
          Loading product from the backend...
        </div>
      )}

      {error && (
        <div className="container" style={{ paddingTop: '16px' }}>
          {error}
        </div>
      )}

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link to="/">SHOP</Link> &gt; <Link to="/collections">COLLECTIONS</Link> &gt;{' '}
          <Link to="/collections">{product.category.toUpperCase()}</Link> &gt;{' '}
          <span>{product.name.toUpperCase()}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className={styles.productSection}>
        <div className="container">
          <div className={styles.productGrid}>
            {/* Image Gallery */}
            <div className={styles.imageGallery}>
              <div className={styles.mainImage}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.thumbnails}>
                {/* Thumbnail images */}
                {[product.image, product.image, product.image, product.image].map(
                  (img, idx) => (
                    <img key={idx} src={img} alt={`View ${idx + 1}`} />
                  )
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className={styles.productInfo}>
              {product.badge && <div className={styles.badge}>{product.badge}</div>}

              <h1>{product.name}</h1>
              <p className={styles.category}>{product.category}</p>

              {/* Rating */}
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <StarFilled
                    key={i}
                    className={i < Math.floor(product.rating || 0) ? styles.starFilled : styles.starEmpty}
                  />
                ))}
                <span>({product.reviewCount} Reviews)</span>
              </div>

              {/* Price */}
              <div className={styles.price}>
                <span className={styles.current}>${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className={styles.original}>${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              {/* Description */}
              <p className={styles.description}>{product.description}</p>

              {/* Key Ingredients */}
              {product.ingredients && (
                <div className={styles.ingredients}>
                  <h3>Key Ingredients</h3>
                  <div className={styles.ingredientsList}>
                    {product.ingredients.map((ingredient, idx) => (
                      <div key={idx} className={styles.ingredient}>
                        ✓ <span>{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className={styles.actions}>
                <div className={styles.quantity}>
                  <button onClick={() => handleQuantityChange(-1)}>
                    <MinusOutlined />
                  </button>
                  <input type="number" value={quantity} readOnly />
                  <button onClick={() => handleQuantityChange(1)}>
                    <PlusOutlined />
                  </button>
                </div>
                <button className="btn-primary" onClick={handleAddToCart}>
                  ADD TO CART
                </button>
              </div>

              {/* Baker's Note */}
              {product.bakerNote && (
                <div className={styles.bakerNote}>
                  <h4>🍞 The Baker's Note</h4>
                  <p>{product.bakerNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={styles.reviewsSection}>
        <div className="container">
          <div className={styles.reviewsGrid}>
            {/* Rating Summary */}
            <div className={styles.ratingSummary}>
              <div className={styles.ratingScore}>
                <h2>{product.rating?.toFixed(1)}</h2>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <StarFilled
                      key={i}
                      className={i < Math.floor(product.rating || 0) ? styles.starFilled : styles.starEmpty}
                    />
                  ))}
                </div>
                <p>Based on {product.reviewCount} reviews</p>
              </div>

              <div className={styles.ratingBars}>
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className={styles.ratingBar}>
                    <span>{star} ★</span>
                    <div className={styles.bar}>
                      <div
                        className={styles.fill}
                        style={{ width: `${(star / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span>30%</span>
                  </div>
                ))}
              </div>

              <button className="btn-secondary" style={{ width: '100%' }}>
                WRITE A REVIEW
              </button>
            </div>

            {/* Reviews List */}
            <div className={styles.reviewsList}>
              {REVIEWS.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
              <button className="btn-secondary" style={{ width: '100%', marginTop: '24px' }}>
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className={styles.relatedProducts}>
        <div className="container">
          <h2>You Might Also Like</h2>
          <p className={styles.subtitle}>Curated pairings for your sweet tooth</p>
          <div className={`${styles.grid} grid grid-cols-4`}>
            {relatedProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={(relatedProduct) => {
                  addToCart(relatedProduct)
                  setCartCount(getCartCount())
                }}
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








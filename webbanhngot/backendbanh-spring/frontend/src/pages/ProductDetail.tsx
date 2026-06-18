import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ReviewCard } from '../components/ReviewCard'
import { ProductCard } from '../components/ProductCard'
import { PRODUCTS } from '../constants/products'
import { addToCart, getCartCount } from '../services/cartService'
import {
  createProductReview,
  getProductReviews,
  validateProductReviewTarget,
  type ProductReviewTarget,
} from '../services/productReviewService'
import { getProductById, getProducts } from '../services/productService'
import type { Product, Review } from '../types/product'
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
  const [productReviews, setProductReviews] = useState<Review[]>([])
  const [reviewTarget, setReviewTarget] = useState<ProductReviewTarget | undefined>()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewOrderId, setReviewOrderId] = useState('')
  const [reviewOrderDetailId, setReviewOrderDetailId] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewError, setReviewError] = useState<string | undefined>()
  const [reviewMessage, setReviewMessage] = useState<string | undefined>()
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const isOutOfStock = product.stockQuantity !== undefined && product.stockQuantity <= 0
  const displayedRating = productReviews.length > 0
    ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length
    : product.rating || 0
  const displayedReviewCount = productReviews.length > 0
    ? productReviews.length
    : product.reviewCount || 0
  const ratingDistribution = useMemo(() => {
    return [5, 4, 3, 2, 1].map((star) => {
      const count = productReviews.filter((review) => review.rating === star).length
      const percent = productReviews.length > 0 ? Math.round((count / productReviews.length) * 100) : 0

      return { star, count, percent }
    })
  }, [productReviews])

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
        const nextProductReviews = await getProductReviews(nextProduct.id)

        setProduct(nextProduct)
        setRelatedProducts(nextRelatedProducts)
        setProductReviews(nextProductReviews)
        setReviewTarget(undefined)
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
    if (isOutOfStock) {
      return
    }

    addToCart(product, quantity)
    setCartCount(getCartCount())
    setQuantity(1)
  }

  const handleQuantityChange = (change: number) => {
    const newQty = Math.max(1, quantity + change)
    setQuantity(newQty)
  }

  const handleShowReviewForm = () => {
    setReviewError(undefined)
    setReviewMessage(undefined)
    setShowReviewForm(true)
  }

  const handleSubmitReview = async (event: FormEvent) => {
    event.preventDefault()

    if (!reviewComment.trim()) {
      setReviewError('Please write your review before submitting.')
      return
    }

    setReviewSubmitting(true)
    setReviewError(undefined)
    setReviewMessage(undefined)

    try {
      const target = await validateProductReviewTarget(
        product.id,
        Number(reviewOrderId),
        Number(reviewOrderDetailId)
      )
      setReviewTarget(target)

      await createProductReview({
        orderDetailId: target.orderDetailId,
        rating: reviewRating,
        comment: reviewComment,
      })
      const nextReviews = await getProductReviews(product.id)
      setProductReviews(nextReviews)
      setProduct((currentProduct) => ({
        ...currentProduct,
        rating: nextReviews.length > 0
          ? nextReviews.reduce((sum, review) => sum + review.rating, 0) / nextReviews.length
          : currentProduct.rating,
        reviewCount: nextReviews.length,
      }))
      setReviewComment('')
      setReviewRating(5)
      setShowReviewForm(false)
      setReviewMessage('Thank you. Your review has been saved to the backend.')
    } catch (err) {
      console.error('Failed to save review:', err)
      setReviewError(err instanceof Error ? err.message : 'Review could not be saved.')
    } finally {
      setReviewSubmitting(false)
    }
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
                    className={i < Math.floor(displayedRating) ? styles.starFilled : styles.starEmpty}
                  />
                ))}
                <span>({displayedReviewCount} Reviews)</span>
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
              {product.stockQuantity !== undefined && (
                <p className={styles.stockStatus}>
                  {isOutOfStock ? 'Out of stock' : `${product.stockQuantity} available`}
                </p>
              )}

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
                <button className="btn-primary" onClick={handleAddToCart} disabled={isOutOfStock}>
                  {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
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
                <h2>{displayedRating.toFixed(1)}</h2>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <StarFilled
                      key={i}
                      className={i < Math.floor(displayedRating) ? styles.starFilled : styles.starEmpty}
                    />
                  ))}
                </div>
                <p>Based on {displayedReviewCount} reviews</p>
              </div>

              <div className={styles.ratingBars}>
                {ratingDistribution.map(({ star, count, percent }) => (
                  <div key={star} className={styles.ratingBar}>
                    <span>{star} ★</span>
                    <div className={styles.bar}>
                      <div
                        className={styles.fill}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <span>{count}</span>
                  </div>
                ))}
              </div>

              <button className="btn-secondary" style={{ width: '100%' }} onClick={handleShowReviewForm}>
                WRITE A REVIEW
              </button>

              {reviewMessage && <p className={styles.reviewSuccess}>{reviewMessage}</p>}
              {reviewError && <p className={styles.reviewError}>{reviewError}</p>}

              {showReviewForm && (
                <form className={styles.reviewForm} onSubmit={handleSubmitReview}>
                  <label>
                    <span>Order ID</span>
                    <input
                      type="number"
                      value={reviewOrderId}
                      onChange={(event) => {
                        setReviewOrderId(event.target.value)
                        setReviewTarget(undefined)
                      }}
                      required
                    />
                  </label>
                  <label>
                    <span>Order Detail ID</span>
                    <input
                      type="number"
                      value={reviewOrderDetailId}
                      onChange={(event) => {
                        setReviewOrderDetailId(event.target.value)
                        setReviewTarget(undefined)
                      }}
                      required
                    />
                  </label>
                  {reviewTarget && (
                    <label>
                      <span>Your name</span>
                      <input value={reviewTarget.customerName} readOnly required />
                    </label>
                  )}
                  <label>
                    <span>Rating</span>
                    <select value={reviewRating} onChange={(event) => setReviewRating(Number(event.target.value))}>
                      <option value={5}>5 stars</option>
                      <option value={4}>4 stars</option>
                      <option value={3}>3 stars</option>
                      <option value={2}>2 stars</option>
                      <option value={1}>1 star</option>
                    </select>
                  </label>
                  <label>
                    <span>Review</span>
                    <textarea
                      value={reviewComment}
                      onChange={(event) => setReviewComment(event.target.value)}
                      rows={4}
                      required
                    />
                  </label>
                  <button className="btn-primary" type="submit" disabled={reviewSubmitting}>
                    {reviewSubmitting ? 'Saving...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>

            {/* Reviews List */}
            <div className={styles.reviewsList}>
              {productReviews.length === 0 && (
                <div className={styles.emptyReviews}>
                  No backend reviews for this product yet.
                </div>
              )}
              {productReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
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








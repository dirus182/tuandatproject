import { HeartOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import styles from './ProductCard.module.css'

export interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onFavorite?: (product: Product) => void
  isFavorite?: boolean
}

export function ProductCard({
  product,
  onAddToCart,
  onFavorite,
  isFavorite = false,
}: ProductCardProps) {
  const isOutOfStock = product.stockQuantity !== undefined && product.stockQuantity <= 0

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className={styles.card}>
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />

        {/* Badge */}
        {product.badge && <div className={styles.badge}>{product.badge}</div>}
        {isOutOfStock && <div className={styles.stockBadge}>Out of stock</div>}

        {/* Overlay Actions */}
        <div className={styles.overlay}>
          <button
            className={styles.actionBtn}
            disabled={isOutOfStock}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (isOutOfStock) {
                return
              }
              onAddToCart?.(product)
            }}
            title={isOutOfStock ? 'Out of stock' : 'Add to cart'}
          >
            <ShoppingCartOutlined />
          </button>
          <button
            className={`${styles.actionBtn} ${isFavorite ? styles.favorited : ''}`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onFavorite?.(product)
            }}
            title="Add to favorites"
          >
            <HeartOutlined />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className={styles.info}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.name}>{product.name}</h3>
        {product.stockQuantity !== undefined && (
          <p className={isOutOfStock ? styles.outOfStockText : styles.stockText}>
            {isOutOfStock ? 'Out of stock' : `${product.stockQuantity} available`}
          </p>
        )}

        {/* Rating */}
        {product.rating && (
          <div className={styles.rating}>
            {[...Array(5)].map((_, i) => (
              <StarFilled
                key={i}
                className={i < Math.floor(product.rating!) ? styles.starFilled : styles.starEmpty}
              />
            ))}
            <span className={styles.ratingText}>
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Price */}
        <div className={styles.price}>
          <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
          )}
         </div>
       </div>
       </div>
    </Link>
  )
}








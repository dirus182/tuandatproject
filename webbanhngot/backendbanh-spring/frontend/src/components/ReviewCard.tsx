import { StarFilled, CheckCircleOutlined } from '@ant-design/icons'
import type { Review } from '../types/product'
import styles from './ReviewCard.module.css'

export interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.authorInfo}>
          <div className={styles.avatar}>{review.avatar}</div>
          <div>
            <div className={styles.author}>
              {review.author}
              {review.verified && <CheckCircleOutlined className={styles.verified} />}
            </div>
            <span className={styles.date}>{review.date}</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className={styles.rating}>
        {[...Array(5)].map((_, i) => (
          <StarFilled
            key={i}
            className={i < review.rating ? styles.starFilled : styles.starEmpty}
          />
        ))}
      </div>

      {/* Title and Content */}
      <h4 className={styles.title}>{review.title}</h4>
      <p className={styles.content}>{review.content}</p>

      {/* Images if any */}
      {review.images && review.images.length > 0 && (
        <div className={styles.images}>
          {review.images.map((img, idx) => (
            <img key={idx} src={img} alt={`Review image ${idx + 1}`} />
          ))}
        </div>
      )}
    </div>
  )
}



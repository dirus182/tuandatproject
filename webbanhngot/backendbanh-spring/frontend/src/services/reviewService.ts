import { API_BASE_URL, ensureOk, getNextId } from './adminApi'
import { getLocalDateTimeString } from '../utils/dateTime'

export type Review = {
  reviews_id?: number
  order_detail_id?: number
  create_at?: string
  created_at?: string
  customer_comment?: string
  rating?: number
}

export async function getReviews(): Promise<Review[]> {
  const res = await fetch(`${API_BASE_URL}/api/reviews`)
  await ensureOk(res)
  return res.json()
}

export async function getReviewById(id: number): Promise<Review | undefined> {
  const res = await fetch(`${API_BASE_URL}/api/reviews/${id}`)
  if (res.status === 404) return undefined
  await ensureOk(res)
  return res.json()
}

export async function createReview(review: Review): Promise<boolean> {
  const reviews = await getReviews()
  const body = normalizeReview(review, review.reviews_id ?? getNextId(reviews as unknown as Record<string, unknown>[], 'reviews_id'))
  const res = await fetch(`${API_BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  await ensureOk(res)
  return ensureBooleanResult(res, 'Review could not be created')
}

export async function updateReview(id: number, review: Review): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(normalizeReview(review, id)),
  })
  await ensureOk(res)
  return ensureBooleanResult(res, 'Review could not be updated')
}

export async function deleteReview(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/api/reviews/${id}`, { method: 'DELETE' })
  await ensureOk(res)
  return ensureBooleanResult(res, 'Review could not be deleted')
}

function normalizeReview(review: Review, reviewId: number): Required<Review> {
  const createAt = normalizeDateTime(review.create_at ?? review.created_at)

  return {
    reviews_id: reviewId,
    order_detail_id: review.order_detail_id ?? 0,
    create_at: createAt,
    created_at: createAt,
    customer_comment: review.customer_comment ?? '',
    rating: review.rating ?? 5,
  }
}

function normalizeDateTime(value?: string): string {
  if (!value) {
    return getLocalDateTimeString()
  }

  return value.includes('T') ? value : value.replace(' ', 'T')
}

async function ensureBooleanResult(response: Response, fallbackMessage: string): Promise<boolean> {
  const result = (await response.json()) as boolean

  if (!result) {
    throw new Error(fallbackMessage)
  }

  return result
}


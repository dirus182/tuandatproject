import type { Review as DisplayReview } from '../types/product'
import { createReview, getReviews } from './reviewService'
import { getOrderDetailById, getOrderDetails } from './orderDetailService'
import { getOrderById, getOrders } from './orderService'
import { getCustomerById, getCustomers } from './customerService'

export type ProductReviewInput = {
  orderDetailId: number
  rating: number
  comment: string
}

export type ProductReviewTarget = {
  orderId: number
  orderDetailId: number
  customerName: string
}

export async function getProductReviews(productId: string): Promise<DisplayReview[]> {
  const [reviews, orderDetails, orders, customers] = await Promise.all([
    getReviews(),
    getOrderDetails(),
    getOrders(),
    getCustomers(),
  ])

  const targetCakeId = Number(productId)
  const orderDetailById = new Map(
    orderDetails
      .filter((detail) => detail.order_detail_id !== undefined)
      .map((detail) => [Number(detail.order_detail_id), detail])
  )
  const orderById = new Map(
    orders
      .filter((order) => order.order_id !== undefined)
      .map((order) => [Number(order.order_id), order])
  )
  const customerById = new Map(
    customers
      .filter((customer) => customer.customer_id !== undefined)
      .map((customer) => [Number(customer.customer_id), customer])
  )

  return reviews
    .map((review): DisplayReview | undefined => {
      const orderDetail = review.order_detail_id !== undefined
        ? orderDetailById.get(Number(review.order_detail_id))
        : undefined

      if (!orderDetail || Number(orderDetail.cake_id) !== targetCakeId) {
        return undefined
      }

      const order = orderById.get(Number(orderDetail.order_id))
      const customer = order ? customerById.get(Number(order.customer_id)) : undefined
      const author = customer
        ? `${customer.first_name ?? ''} ${customer.last_name ?? ''}`.trim()
        : 'Bakery Customer'

      const displayReview: DisplayReview = {
        id: String(review.reviews_id ?? `${orderDetail.order_detail_id}-${review.rating}`),
        author,
        rating: Number(review.rating ?? 0),
        title: 'Customer Review',
        content: review.customer_comment ?? '',
        date: formatReviewDate(review.create_at ?? review.created_at),
        avatar: getInitials(author),
        verified: true,
      }

      return displayReview
    })
    .filter((review): review is DisplayReview => review !== undefined)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function createProductReview(input: ProductReviewInput): Promise<boolean> {
  return createReview({
    order_detail_id: input.orderDetailId,
    customer_comment: input.comment.trim(),
    rating: input.rating,
  })
}

export async function validateProductReviewTarget(
  productId: string,
  orderId: number,
  orderDetailId: number
): Promise<ProductReviewTarget> {
  if (!Number.isFinite(orderId) || orderId <= 0 || !Number.isFinite(orderDetailId) || orderDetailId <= 0) {
    throw new Error('Please enter a valid Order ID and Order Detail ID.')
  }

  const [orderDetail, order] = await Promise.all([
    getOrderDetailById(orderDetailId),
    getOrderById(orderId),
  ])

  if (!orderDetail || orderDetail.order_detail_id === undefined) {
    throw new Error('Order detail was not found.')
  }

  if (Number(orderDetail.order_id) !== orderId) {
    throw new Error('This order detail does not belong to the entered order.')
  }

  if (Number(orderDetail.cake_id) !== Number(productId)) {
    throw new Error('This order detail is for another product.')
  }

  if (!order || order.order_id === undefined) {
    throw new Error('Order was not found.')
  }

  if ((order.status ?? '').toLowerCase() !== 'shipped') {
    throw new Error('This order has not been shipped yet. Reviews are only allowed after the order is shipped.')
  }

  const customer = await getCustomerById(Number(order.customer_id))
  const customerName = customer
    ? `${customer.first_name ?? ''} ${customer.last_name ?? ''}`.trim()
    : ''

  if (!customerName) {
    throw new Error('Customer name could not be found for this order.')
  }

  return {
    orderId,
    orderDetailId,
    customerName,
  }
}

function formatReviewDate(value?: string): string {
  if (!value) {
    return new Date().toLocaleDateString()
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString()
}

function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  return initials || 'BC'
}

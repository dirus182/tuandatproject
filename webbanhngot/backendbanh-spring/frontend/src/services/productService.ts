import type { Product } from '../types/product'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
const DEFAULT_IMAGE = '/products/defaultbakery.jpg'

const PRODUCT_IMAGES: Record<string, string> = {
  'chocolate cake': '/products/Chocolate Cake.jpg',
  'vanilla cake': '/products/Vanilla Cake.jpg',
  'strawberry cake': '/products/Strawberry Cake.jpg',
  'caramel cake': '/products/Caramel Cake.jpg',
  'almond cake': '/products/Almond Cake.jpg',
  'blueberry cake': '/products/Blueberry Cake.jpg',
  'coconut cake': '/products/Coconut Cake.jpg',
  'honey cake': '/products/Honey Cake.jpg',
  tiramisu: '/products/Tiramisu.jpg',
  'cheese bread': '/products/Cheese Bread.jpg',
  'garlic bread': '/products/Garlic Bread.jpg',
  'sausage roll': '/products/Sausage Roll.jpg',
  'ham croissant': '/products/Ham Croissant.jpg',
  'herb crackers': '/products/Herb Crackers.jpg',
  'cheddar biscuit': '/products/Cheddar Biscuit.jpg',
  'tomato focaccia': '/products/Tomato Focaccia.jpg',
  'pepper bread': '/products/Pepper Bread.jpg',
  'parmesan stick': '/products/Parmesan Stick.jpg',
}

const FLAVOR_KEYWORDS = [
  'Chocolate',
  'Vanilla',
  'Strawberry',
  'Caramel',
  'Almond',
  'Blueberry',
  'Coconut',
  'Honey',
  'Tiramisu',
  'Cheese',
  'Garlic',
  'Sausage',
  'Ham',
  'Herb',
  'Cheddar',
  'Tomato',
  'Pepper',
  'Parmesan',
]

export type BackendProduct = {
  cake_id: number
  option_cake_id?: number
  quantity?: number
  price: number | string
  description?: string[]
  cake_name?: string
  create_at?: string
}

type BackendOrderDetail = {
  order_detail_id?: number
  cake_id?: number
}

type BackendReview = {
  reviews_id?: number
  order_detail_id?: number
  cake_id?: number
  rating?: number | string
}

function getProductImage(raw: BackendProduct): string {
  const productName = raw.cake_name?.trim().toLowerCase()
  return productName ? PRODUCT_IMAGES[productName] ?? DEFAULT_IMAGE : DEFAULT_IMAGE
}

function getProductCategory(raw: BackendProduct): Product['category'] {
  if (raw.option_cake_id === 2) {
    const productName = raw.cake_name?.toLowerCase() ?? ''

    if (productName.includes('croissant')) {
      return 'Pastries'
    }

    return 'Bread'
  }

  return 'Cakes'
}

function getProductFlavors(raw: BackendProduct): string[] {
  const searchableText = [
    raw.cake_name ?? '',
    ...(raw.description ?? []),
  ].join(' ').toLowerCase()

  return FLAVOR_KEYWORDS.filter((flavor) => searchableText.includes(flavor.toLowerCase()))
}

function mapBackendProduct(raw: BackendProduct): Product {
  return {
    id: String(raw.cake_id),
    name: raw.cake_name ?? `Product ${raw.cake_id}`,
    category: getProductCategory(raw),
    price: Number(raw.price ?? 0),
    stockQuantity: raw.quantity ?? 0,
    image: getProductImage(raw),
    description: raw.description?.join(' ') ?? 'Delicious artisan cake.',
    ingredients: [],
    flavor: getProductFlavors(raw),
    reviewCount: 0,
    rating: 0,
  }
}

export async function getProducts(): Promise<Product[]> {
  const [productsResponse, orderDetailsResponse, reviewsResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/api/products`),
    fetch(`${API_BASE_URL}/api/order-details`),
    fetch(`${API_BASE_URL}/api/reviews`),
  ])

  if (!productsResponse.ok) {
    throw new Error(`Backend request failed with status ${productsResponse.status}`)
  }

  const data = (await productsResponse.json()) as BackendProduct[]
  const orderDetails = orderDetailsResponse.ok
    ? ((await orderDetailsResponse.json()) as BackendOrderDetail[])
    : []
  const reviews = reviewsResponse.ok ? ((await reviewsResponse.json()) as BackendReview[]) : []

  const orderDetailToCake = new Map<number, number>()
  for (const orderDetail of orderDetails) {
    if (orderDetail.order_detail_id !== undefined && orderDetail.cake_id !== undefined) {
      orderDetailToCake.set(Number(orderDetail.order_detail_id), Number(orderDetail.cake_id))
    }
  }

  const reviewStats = new Map<number, { sum: number; count: number }>()
  for (const review of reviews) {
    const cakeId =
      review.cake_id !== undefined
        ? Number(review.cake_id)
        : review.order_detail_id !== undefined
          ? orderDetailToCake.get(Number(review.order_detail_id))
          : undefined

    if (cakeId === undefined) {
      continue
    }

    const rating = Number(review.rating ?? 0)
    if (!Number.isFinite(rating) || rating <= 0) {
      continue
    }

    const stats = reviewStats.get(cakeId) ?? { sum: 0, count: 0 }
    stats.sum += rating
    stats.count += 1
    reviewStats.set(cakeId, stats)
  }

  return data.map((rawProduct) => {
    const product = mapBackendProduct(rawProduct)
    const stats = reviewStats.get(rawProduct.cake_id)

    if (stats && stats.count > 0) {
      product.rating = Math.round((stats.sum / stats.count) * 10) / 10
      product.reviewCount = stats.count
    }

    return product
  })
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts()
  return products.find((product) => product.id === id)
}

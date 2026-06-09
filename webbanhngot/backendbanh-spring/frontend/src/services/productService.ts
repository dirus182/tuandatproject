import type { Product } from '../types/product'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop'

export type BackendProduct = {
  cake_id: number
  option_cake_id?: number
  quantity?: number
  price: number | string
  description?: string[]
  cake_name?: string
  create_at?: string
}

function mapBackendProduct(raw: BackendProduct): Product {
  return {
    id: String(raw.cake_id),
    name: raw.cake_name ?? `Product ${raw.cake_id}`,
    category: 'Cakes',
    price: Number(raw.price ?? 0),
    image: DEFAULT_IMAGE,
    description: raw.description?.join(' ') ?? 'Delicious artisan cake.',
    ingredients: [],
    reviewCount: 0,
    rating: 0,
  }
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/api/products`)

  if (!response.ok) {
    throw new Error(`Backend request failed with status ${response.status}`)
  }

  const data = (await response.json()) as BackendProduct[]

  return data.map(mapBackendProduct)
}

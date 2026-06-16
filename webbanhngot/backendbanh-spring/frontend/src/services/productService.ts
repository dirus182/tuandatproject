import type { Product } from '../types/product'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&h=600&fit=crop&auto=format'

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
export type BackendProduct = {
  cake_id: number
  option_cake_id?: number
  quantity?: number
  price: number | string
  description?: string[]
  cake_name?: string
  create_at?: string
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

export async function getProductById(id: string): Promise<Product | undefined> {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`)

  if (response.status === 404) {
    return undefined
  }

  if (!response.ok) {
    throw new Error(`Backend request failed with status ${response.status}`)
  }

  const data = (await response.json()) as BackendProduct | null

  return data ? mapBackendProduct(data) : undefined
}

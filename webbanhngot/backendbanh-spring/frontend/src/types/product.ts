export interface Product {
  id: string
  name: string
  category: 'Cakes' | 'Pastries' | 'Cookies' | 'Bread'
  price: number
  stockQuantity?: number
  originalPrice?: number
  image: string
  images?: string[]
  description?: string
  rating?: number
  reviewCount?: number
  badge?: 'Best Seller' | 'Seasonal Special'
  ingredients?: string[]
  flavor?: string[]
  bakerNote?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Review {
  id: string
  author: string
  rating: number
  title: string
  content: string
  date: string
  avatar?: string
  verified?: boolean
  images?: string[]
}

export interface OrderSummary {
  subtotal: number
  shipping: number
  tax: number
  total: number
}


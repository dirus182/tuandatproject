import type { Product, Review } from '../types/product'

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Ganache Cake',
    category: 'Cakes',
    price: 54,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 128,
    description: 'Rich chocolate ganache cake with layers of dark chocolate sponge',
    ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Flour'],
    bakerNote: 'Our signature chocolate cake, perfected over years of baking.',
  },
  {
    id: '2',
    name: 'French Butter Croissants',
    category: 'Pastries',
    price: 18,
    originalPrice: 22,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 256,
    description: 'Authentic French croissants with laminated butter layers',
    ingredients: ['Flour', 'Butter', 'Water', 'Salt', 'Sugar'],
  },
  {
    id: '3',
    name: 'Vanilla Bean Cheesecake',
    category: 'Cakes',
    price: 42,
    image: 'https://images.unsplash.com/photo-1533134242443-742d47002da1?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 89,
    description: 'Creamy vanilla cheesecake with graham cracker crust',
    ingredients: ['Cream Cheese', 'Sugar', 'Vanilla', 'Eggs', 'Graham Crackers'],
  },
  {
    id: '4',
    name: 'Artisan Macaron Box',
    category: 'Cookies',
    price: 24,
    image: 'https://images.unsplash.com/photo-1559365267573-aac5ce626d77?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 142,
    description: 'Assorted French macarons in seasonal flavors',
    ingredients: ['Almond Flour', 'Sugar', 'Egg Whites', 'Food Coloring'],
    flavor: ['Pistachio', 'Rose', 'Chocolate', 'Raspberry'],
  },
  {
    id: '5',
    name: 'Lemon Lavender Cake',
    category: 'Cakes',
    price: 40,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 95,
    description: 'Delicate lemon cake infused with lavender flavors',
    ingredients: ['Lemon', 'Lavender', 'Flour', 'Butter', 'Sugar'],
  },
  {
    id: '6',
    name: 'Classic Butter Croissants',
    category: 'Pastries',
    price: 18,
    image: 'https://images.unsplash.com/photo-1596080876098-b8b74a8c9ec1?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 321,
    description: 'Traditional butter croissants, baked fresh daily',
    ingredients: ['Flour', 'Butter', 'Water', 'Salt'],
  },
]

export const CATEGORIES = [
  { label: 'Cakes', value: 'Cakes', count: 12 },
  { label: 'Pastries', value: 'Pastries', count: 24 },
  { label: 'Cookies', value: 'Cookies', count: 18 },
  { label: 'Bread', value: 'Bread', count: 9 },
]

export const FLAVOR_OPTIONS = [
  'Chocolate',
  'Vanilla',
  'Strawberry',
  'Lemon',
  'Salted Caramel',
]

export const PRICE_RANGES = [
  { label: '$1 - $2', min: 1, max: 2 },
  { label: '$2 - $3', min: 2, max: 3 },
  { label: '$3 - $4', min: 3, max: 4 },
  { label: '$5 - $6', min: 5, max: 6 },
  { label: '$6 - $7', min: 6, max: 7 },
  { label: '$7++', min: 7, max: Infinity },
]

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Camelia E.',
    rating: 5,
    title: 'Simply perfection.',
    content:
      'Ordered this for my daughter\'s birthday and it was the highlight of the evening. The sponge is incredibly light—like eating a cloud. The strawberries were so fresh and sweet. Worth every penny!',
    date: 'JUNE 14, 2024',
    avatar: '🧑‍🤝‍🧑',
    verified: true,
  },
  {
    id: '2',
    author: 'Juliana L.',
    rating: 5,
    title: 'Deliciously balanced.',
    content:
      'I appreciate that it\'s not overly sugary. You can actually taste the butter in the cake and the vanilla in the cream. My only wish is that there were even more strawberries in the middle layer!',
    date: 'MAY 28, 2024',
    avatar: '👩',
    verified: true,
  },
  {
    id: '3',
    author: 'Maria A.',
    rating: 5,
    title: 'A Summer Essential',
    content:
      'This is my third time ordering this cake this season. It\'s the perfect gift for garden parties. Everyone always asks where it\'s from!',
    date: 'MAY 12, 2024',
    avatar: '👩‍🦰',
    verified: true,
  },
]

export const NAV_LINKS = ['Shop', 'Collections', 'Our Story', 'Wholesale', 'Contact']

export const BAKER_NOTE = 'THE BAKER\'S NOTE'
export const BAKER_NOTE_CONTENT =
  'The sourdough peaks in flavor 24 hours after baking. We recommend storing it in a paper bag at room temperature to preserve the craft\'s texture.'



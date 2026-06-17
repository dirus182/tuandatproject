import type { CartItem } from '../types/product'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export type CheckoutCustomer = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
}

export type CheckoutPayload = {
  customer: CheckoutCustomer
  items: Array<{
    cakeId: number
    quantity: number
    subTotal: number
  }>
  totalPrice: number
  paymentMethod: 'cash' | 'credit_card' | 'paypal'
}

export type CheckoutResponse = {
  customerId: number
  orderId: number
  orderDetailIds: number[]
  totalPrice: number
  paymentMethod: string
  message: string
}

export function buildCheckoutPayload(
  customer: CheckoutCustomer,
  cartItems: CartItem[],
  totalPrice: number,
  paymentMethod: CheckoutPayload['paymentMethod']
): CheckoutPayload {
  return {
    customer,
    paymentMethod,
    totalPrice,
    items: cartItems.map((item) => ({
      cakeId: Number(item.product.id),
      quantity: item.quantity,
      subTotal: Number((item.product.price * item.quantity).toFixed(2)),
    })),
  }
}

export async function createCheckout(payload: CheckoutPayload): Promise<CheckoutResponse> {
  const response = await fetch(`${API_BASE_URL}/api/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const fallbackMessage = `Checkout failed with status ${response.status}`

    try {
      const text = await response.text()
      if (!text) {
        throw new Error(fallbackMessage)
      }

      let message = text
      try {
        const data = JSON.parse(text) as { message?: string; error?: string }
        message = data.message || data.error || fallbackMessage
      } catch {
        message = text
      }

      throw new Error(message)
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error(fallbackMessage)
    }
  }

  return response.json() as Promise<CheckoutResponse>
}

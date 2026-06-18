import { API_BASE_URL, ensureOk, getNextId } from './adminApi'

export type Order = {
  order_id?: number
  customer_id: number
  status?: string
  order_date?: string
  total_price?: number
}

export async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE_URL}/api/orders`)
  await ensureOk(res)
  return res.json()
}

export async function getOrderById(id: number): Promise<Order | undefined> {
  const res = await fetch(`${API_BASE_URL}/api/orders/${id}`)
  if (res.status === 404) return undefined
  await ensureOk(res)
  return res.json()
}

export async function createOrder(order: Order): Promise<boolean> {
  const orders = await getOrders()
  const body = normalizeOrder(order, order.order_id ?? getNextId(orders as unknown as Record<string, unknown>[], 'order_id'))
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  await ensureOk(res)
  return ensureBooleanResult(res, 'Order could not be created')
}

export async function updateOrder(id: number, order: Order): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(normalizeOrder(order, id)),
  })
  await ensureOk(res)
  return ensureBooleanResult(res, 'Order could not be updated. If status is shipped or delivered, payment must be completed first.')
}

export async function deleteOrder(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, { method: 'DELETE' })
  await ensureOk(res)
  return ensureBooleanResult(res, 'Order could not be deleted')
}

function normalizeOrder(order: Order, orderId: number): Required<Order> {
  return {
    order_id: orderId,
    customer_id: order.customer_id,
    status: order.status || 'pending',
    order_date: normalizeDateTime(order.order_date),
    total_price: order.total_price ?? 0,
  }
}

function normalizeDateTime(value?: string): string {
  if (!value) {
    return new Date().toISOString().slice(0, 19)
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


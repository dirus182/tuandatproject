import { API_BASE_URL, ensureOk, getNextId } from './adminApi'

export type OrderDetail = {
  order_detail_id?: number
  order_id: number
  cake_id: number
  quantity: number
  sub_total: number
}

export async function getOrderDetails(): Promise<OrderDetail[]> {
  const res = await fetch(`${API_BASE_URL}/api/order-details`)
  await ensureOk(res)
  return res.json()
}

export async function getOrderDetailById(id: number): Promise<OrderDetail | undefined> {
  const res = await fetch(`${API_BASE_URL}/api/order-details/${id}`)
  if (res.status === 404) return undefined
  await ensureOk(res)
  return res.json()
}

export async function createOrderDetail(detail: OrderDetail): Promise<boolean> {
  const details = await getOrderDetails()
  const body = normalizeOrderDetail(detail, detail.order_detail_id ?? getNextId(details as unknown as Record<string, unknown>[], 'order_detail_id'))
  const res = await fetch(`${API_BASE_URL}/api/order-details`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  await ensureOk(res)
  return true
}

export async function updateOrderDetail(id: number, detail: OrderDetail): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/api/order-details/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(normalizeOrderDetail(detail, id)),
  })
  await ensureOk(res)
  return true
}

export async function deleteOrderDetail(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/api/order-details/${id}`, { method: 'DELETE' })
  await ensureOk(res)
  return true
}

function normalizeOrderDetail(detail: OrderDetail, orderDetailId: number): Required<OrderDetail> {
  return {
    order_detail_id: orderDetailId,
    order_id: detail.order_id,
    cake_id: detail.cake_id,
    quantity: detail.quantity,
    sub_total: detail.sub_total ?? 0,
  }
}


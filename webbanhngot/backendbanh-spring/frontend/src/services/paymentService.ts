import { API_BASE_URL, ensureOk, getNextId } from './adminApi'
import { getLocalDateTimeString } from '../utils/dateTime'

export type Payment = {
  payment_id?: number
  order_id: number
  payment_method?: string
  payment_status?: string
  payment_date?: string
}

export async function getPayments(): Promise<Payment[]> {
  const res = await fetch(`${API_BASE_URL}/api/payments`)
  await ensureOk(res)
  return res.json()
}

export async function getPaymentById(id: number): Promise<Payment | undefined> {
  const res = await fetch(`${API_BASE_URL}/api/payments/${id}`)
  if (res.status === 404) return undefined
  await ensureOk(res)
  return res.json()
}

export async function createPayment(payment: Payment): Promise<boolean> {
  const payments = await getPayments()
  const body = normalizePayment(payment, payment.payment_id ?? getNextId(payments as unknown as Record<string, unknown>[], 'payment_id'))
  const res = await fetch(`${API_BASE_URL}/api/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  await ensureOk(res)
  return true
}

export async function updatePayment(id: number, payment: Payment): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/api/payments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(normalizePayment(payment, id)),
  })
  await ensureOk(res)
  return true
}

export async function deletePayment(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/api/payments/${id}`, { method: 'DELETE' })
  await ensureOk(res)
  return true
}

function normalizePayment(payment: Payment, paymentId: number): Required<Payment> {
  return {
    payment_id: paymentId,
    order_id: payment.order_id,
    payment_method: payment.payment_method || 'cash',
    payment_status: payment.payment_status || 'pending',
    payment_date: normalizeDateTime(payment.payment_date),
  }
}

function normalizeDateTime(value?: string): string {
  if (!value) {
    return getLocalDateTimeString()
  }

  return value.includes('T') ? value : value.replace(' ', 'T')
}


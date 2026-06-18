import { API_BASE_URL, ensureOk, getNextId } from './adminApi'

export type Customer = {
  customer_id?: number
  phone_number: string
  first_name: string
  last_name: string
  customer_email: string
  address_id: string
}

export async function getCustomers(): Promise<Customer[]> {
  const res = await fetch(`${API_BASE_URL}/api/customers`)
  await ensureOk(res)
  return res.json()
}

export async function getCustomerById(id: number): Promise<Customer | undefined> {
  const res = await fetch(`${API_BASE_URL}/api/customers/${id}`)
  if (res.status === 404) return undefined
  await ensureOk(res)
  return res.json()
}

export async function createCustomer(customer: Customer): Promise<boolean> {
  const customers = await getCustomers()
  const body = {
    ...customer,
    customer_id: customer.customer_id ?? getNextId(customers as unknown as Record<string, unknown>[], 'customer_id'),
  }
  const res = await fetch(`${API_BASE_URL}/api/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  await ensureOk(res)
  return true
}

export async function updateCustomer(id: number, customer: Customer): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/api/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...customer, customer_id: id }),
  })
  await ensureOk(res)
  return true
}

export async function deleteCustomer(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/api/customers/${id}`, { method: 'DELETE' })
  await ensureOk(res)
  return true
}


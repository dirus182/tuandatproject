import React, { useEffect, useMemo, useState } from 'react'
import { createOrder, deleteOrder, getOrders, updateOrder } from '../services/orderService'
import type { Order } from '../services/orderService'
import { getCustomers } from '../services/customerService'
import { getOrderDetails } from '../services/orderDetailService'
import { getPayments } from '../services/paymentService'
import { getBackendProducts } from '../services/productService'
import type { OrderDetail } from '../services/orderDetailService'
import type { BackendProduct } from '../services/productService'
import type { Payment } from '../services/paymentService'
import styles from '../components/AdminCrud.module.css'

const EMPTY_FORM: Order = {
  customer_id: 0,
  total_price: 0,
  status: 'pending',
}

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [customersMap, setCustomersMap] = useState<Record<number, { first_name?: string; last_name?: string; customer_email?: string }>>({})
  const [orderDetailsMap, setOrderDetailsMap] = useState<Record<number, OrderDetail[]>>({})
  const [productsMap, setProductsMap] = useState<Record<number, BackendProduct>>({})
  const [paymentsMap, setPaymentsMap] = useState<Record<number, Payment>>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Order>(EMPTY_FORM)

  useEffect(() => {
    void load()
  }, [])

  const isEditing = useMemo(() => editingId !== null, [editingId])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const [ordersRes, customers, orderDetails, backendProducts, payments] = await Promise.all([
        getOrders(),
        getCustomers(),
        getOrderDetails(),
        getBackendProducts(),
        getPayments(),
      ])

      setOrders(ordersRes)

      // build customers map for quick lookup
      const cMap: Record<number, { first_name?: string; last_name?: string; customer_email?: string }> = {}
      for (const c of customers) {
        if (c.customer_id != null) cMap[Number(c.customer_id)] = c
      }
      setCustomersMap(cMap)

      // group order details by order_id
      const odMap: Record<number, OrderDetail[]> = {}
      for (const od of orderDetails) {
        const oid = Number(od.order_id)
        if (!odMap[oid]) odMap[oid] = []
        odMap[oid].push(od)
      }
      setOrderDetailsMap(odMap)

      // products map by cake_id
      const pMap: Record<number, BackendProduct> = {}
      for (const p of backendProducts) {
        pMap[Number(p.cake_id)] = p
      }
      setProductsMap(pMap)

      const payMap: Record<number, Payment> = {}
      for (const payment of payments) {
        payMap[Number(payment.order_id)] = payment
      }
      setPaymentsMap(payMap)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  function startEdit(order: Order) {
    setEditingId(order.order_id ?? null)
    setForm({
      customer_id: order.customer_id,
      status: order.status ?? 'pending',
      order_date: order.order_date,
      total_price: order.total_price ?? 0,
    })
  }

  async function handleDelete(id?: number) {
    if (!id) return
    setSaving(true)
    setError(null)
    try {
      await deleteOrder(id)
      if (editingId === id) resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete order')
    } finally {
      setSaving(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      if (editingId !== null) {
        await updateOrder(editingId, form)
      } else {
        await createOrder(form)
      }

      resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save order')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Admin API</span>
          <h1 className={styles.title}>Orders</h1>
          <p className={styles.subtitle}>Manage customer orders, update status, and keep totals in sync.</p>
        </div>
        <span className={styles.status}>{loading ? 'Refreshing…' : `${orders.length} records`}</span>
      </div>

      {error && <div className={styles.card} style={{ borderColor: '#e7b4b4', color: '#9b3d3d' }}>{error}</div>}

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>{isEditing ? 'Edit order' : 'Create order'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <label className={styles.formField}>
              <span className={styles.label}>Customer ID</span>
              <input className={styles.input} type="number" value={form.customer_id} onChange={(e) => setForm({ ...form, customer_id: Number(e.target.value) })} />
            </label>
            <label className={styles.formField}>
              <span className={styles.label}>Total price</span>
              <input className={styles.input} type="number" value={form.total_price ?? 0} onChange={(e) => setForm({ ...form, total_price: Number(e.target.value) })} />
            </label>
            <label className={styles.formField}>
              <span className={styles.label}>Status</span>
              <select className={styles.input} value={form.status ?? 'pending'} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="pending">pending</option>
                <option value="shipped">shipped</option>
                <option value="delivered">delivered</option>
                <option value="canceled">canceled</option>
              </select>
            </label>
            <label className={styles.formField}>
              <span className={styles.label}>Order date</span>
              <input className={styles.input} value={form.order_date ?? ''} onChange={(e) => setForm({ ...form, order_date: e.target.value })} />
            </label>
          </div>

          <div className={styles.actionsRow}>
            <button className={`${styles.button} ${styles.primaryButton}`} type="submit" disabled={saving}>
              {saving ? 'Saving…' : isEditing ? 'Update order' : 'Create order'}
            </button>
            {isEditing && (
              <button className={`${styles.button} ${styles.secondaryButton}`} type="button" onClick={resetForm}>
                Cancel edit
              </button>
            )}
          </div>
        </form>
      </section>

      <section className={`${styles.card} ${styles.tableCard}`}>
        <h2 className={styles.cardTitle}>Order list</h2>
        {loading ? (
          <div className={styles.emptyState}>Loading orders…</div>
        ) : orders.length === 0 ? (
          <div className={styles.emptyState}>No orders found.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Order date</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const cust = order.customer_id ? customersMap[Number(order.customer_id)] : undefined
                  const items = order.order_id ? orderDetailsMap[Number(order.order_id)] ?? [] : []
                  const payment = order.order_id ? paymentsMap[Number(order.order_id)] : undefined
                  return (
                    <React.Fragment key={order.order_id}>
                      <tr>
                        <td>{order.order_id}</td>
                        <td>
                          {cust ? (
                            <div>
                              <div style={{ fontWeight: 700 }}>{`${cust.first_name ?? ''} ${cust.last_name ?? ''}`.trim() || `#${order.customer_id}`}</div>
                              <div style={{ fontSize: '0.9rem', color: '#666' }}>{cust.customer_email}</div>
                            </div>
                          ) : (
                            `#${order.customer_id}`
                          )}
                        </td>
                        <td>{order.status}</td>
                        <td>{payment?.payment_status ?? 'No payment'}</td>
                        <td>{order.order_date}</td>
                        <td>{order.total_price}</td>
                        <td>
                          <div className={styles.rowActions}>
                            <button className={`${styles.button} ${styles.secondaryButton}`} type="button" onClick={() => startEdit(order)}>
                              Edit
                            </button>
                            <button className={`${styles.button} ${styles.secondaryButton}`} type="button" onClick={() => {
                              // toggle items visibility by adding/removing a CSS-managed expand state
                              const el = document.getElementById(`order-items-${order.order_id}`)
                              if (el) el.style.display = el.style.display === 'table-row' ? 'none' : 'table-row'
                            }}>
                              {items.length} items
                            </button>
                            <button className={`${styles.button} ${styles.dangerButton}`} type="button" onClick={() => handleDelete(order.order_id)} disabled={saving}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                      {/* hidden row showing items for this order */}
                      <tr id={`order-items-${order.order_id}`} style={{ display: 'none', background: '#fafafa' }}>
                        <td colSpan={7}>
                          {items.length === 0 ? (
                            <div style={{ padding: 10 }}>No items</div>
                          ) : (
                            <div style={{ padding: 10 }}>
                              <strong>Items:</strong>
                              <ul style={{ marginTop: 8 }}>
                                {items.map((it) => (
                                  <li key={it.order_detail_id}>
                                    {productsMap[Number(it.cake_id)]?.cake_name ?? `Product #${it.cake_id}`} — qty: {it.quantity} — sub: {it.sub_total}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

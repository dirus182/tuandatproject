import React, { useEffect, useMemo, useState } from 'react'
import { createOrderDetail, deleteOrderDetail, getOrderDetails, updateOrderDetail } from '../services/orderDetailService'
import type { OrderDetail } from '../services/orderDetailService'
import styles from '../components/AdminCrud.module.css'

const EMPTY_FORM: OrderDetail = {
  order_id: 0,
  cake_id: 0,
  quantity: 1,
  sub_total: 0,
}

export function OrderDetailsPage() {
  const [items, setItems] = useState<OrderDetail[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<OrderDetail>(EMPTY_FORM)

  useEffect(() => {
    void load()
  }, [])

  const isEditing = useMemo(() => editingId !== null, [editingId])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      setItems(await getOrderDetails())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load order details')
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  function startEdit(item: OrderDetail) {
    setEditingId(item.order_detail_id ?? null)
    setForm({
      order_id: item.order_id,
      cake_id: item.cake_id,
      quantity: item.quantity,
      sub_total: item.sub_total,
    })
  }

  async function handleDelete(id?: number) {
    if (!id) return
    setSaving(true)
    setError(null)
    try {
      await deleteOrderDetail(id)
      if (editingId === id) resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete order detail')
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
        await updateOrderDetail(editingId, form)
      } else {
        await createOrderDetail(form)
      }

      resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save order detail')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Admin API</span>
          <h1 className={styles.title}>Order Details</h1>
          <p className={styles.subtitle}>Manage line items attached to each customer order.</p>
        </div>
        <span className={styles.status}>{loading ? 'Refreshing…' : `${items.length} records`}</span>
      </div>

      {error && <div className={styles.card} style={{ borderColor: '#e7b4b4', color: '#9b3d3d' }}>{error}</div>}

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>{isEditing ? 'Edit order detail' : 'Create order detail'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <label className={styles.formField}>
              <span className={styles.label}>Order ID</span>
              <input className={styles.input} type="number" value={form.order_id} onChange={(e) => setForm({ ...form, order_id: Number(e.target.value) })} />
            </label>
            <label className={styles.formField}>
              <span className={styles.label}>Cake ID</span>
              <input className={styles.input} type="number" value={form.cake_id} onChange={(e) => setForm({ ...form, cake_id: Number(e.target.value) })} />
            </label>
            <label className={styles.formField}>
              <span className={styles.label}>Quantity</span>
              <input className={styles.input} type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
            </label>
            <label className={styles.formField}>
              <span className={styles.label}>Sub total</span>
              <input className={styles.input} type="number" value={form.sub_total} onChange={(e) => setForm({ ...form, sub_total: Number(e.target.value) })} />
            </label>
          </div>

          <div className={styles.actionsRow}>
            <button className={`${styles.button} ${styles.primaryButton}`} type="submit" disabled={saving}>
              {saving ? 'Saving…' : isEditing ? 'Update order detail' : 'Create order detail'}
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
        <h2 className={styles.cardTitle}>Order detail list</h2>
        {loading ? (
          <div className={styles.emptyState}>Loading order details…</div>
        ) : items.length === 0 ? (
          <div className={styles.emptyState}>No order details found.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order</th>
                  <th>Cake</th>
                  <th>Qty</th>
                  <th>Sub total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((detail) => (
                  <tr key={detail.order_detail_id}>
                    <td>{detail.order_detail_id}</td>
                    <td>{detail.order_id}</td>
                    <td>{detail.cake_id}</td>
                    <td>{detail.quantity}</td>
                    <td>{detail.sub_total}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <button className={`${styles.button} ${styles.secondaryButton}`} type="button" onClick={() => startEdit(detail)}>
                          Edit
                        </button>
                        <button className={`${styles.button} ${styles.dangerButton}`} type="button" onClick={() => handleDelete(detail.order_detail_id)} disabled={saving}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}




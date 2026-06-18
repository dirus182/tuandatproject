import React, { useEffect, useMemo, useState } from 'react'
import { createPayment, deletePayment, getPayments, updatePayment } from '../services/paymentService'
import type { Payment } from '../services/paymentService'
import styles from '../components/AdminCrud.module.css'

const EMPTY_FORM: Payment = {
  order_id: 0,
  payment_method: 'cash',
  payment_status: 'pending',
}

export function PaymentsPage() {
  const [items, setItems] = useState<Payment[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Payment>(EMPTY_FORM)

  useEffect(() => {
    void load()
  }, [])

  const isEditing = useMemo(() => editingId !== null, [editingId])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      setItems(await getPayments())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load payments')
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  function startEdit(item: Payment) {
    setEditingId(item.payment_id ?? null)
    setForm({
      order_id: item.order_id,
      payment_method: item.payment_method ?? 'cash',
      payment_status: item.payment_status ?? 'pending',
      payment_date: item.payment_date,
    })
  }

  async function handleDelete(id?: number) {
    if (!id) return
    setSaving(true)
    setError(null)
    try {
      await deletePayment(id)
      if (editingId === id) resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete payment')
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
        await updatePayment(editingId, form)
      } else {
        await createPayment(form)
      }

      resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save payment')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Admin API</span>
          <h1 className={styles.title}>Payments</h1>
          <p className={styles.subtitle}>Update payment methods and statuses for existing orders.</p>
        </div>
        <span className={styles.status}>{loading ? 'Refreshing…' : `${items.length} records`}</span>
      </div>

      {error && <div className={styles.card} style={{ borderColor: '#e7b4b4', color: '#9b3d3d' }}>{error}</div>}

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>{isEditing ? 'Edit payment' : 'Create payment'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <label className={styles.formField}>
              <span className={styles.label}>Order ID</span>
              <input className={styles.input} type="number" value={form.order_id} onChange={(e) => setForm({ ...form, order_id: Number(e.target.value) })} />
            </label>
            <label className={styles.formField}>
              <span className={styles.label}>Payment method</span>
              <input className={styles.input} value={form.payment_method ?? ''} onChange={(e) => setForm({ ...form, payment_method: e.target.value })} />
            </label>
            <label className={styles.formField}>
              <span className={styles.label}>Payment status</span>
              <input className={styles.input} value={form.payment_status ?? ''} onChange={(e) => setForm({ ...form, payment_status: e.target.value })} />
            </label>
            <label className={styles.formField}>
              <span className={styles.label}>Payment date</span>
              <input className={styles.input} value={form.payment_date ?? ''} onChange={(e) => setForm({ ...form, payment_date: e.target.value })} />
            </label>
          </div>

          <div className={styles.actionsRow}>
            <button className={`${styles.button} ${styles.primaryButton}`} type="submit" disabled={saving}>
              {saving ? 'Saving…' : isEditing ? 'Update payment' : 'Create payment'}
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
        <h2 className={styles.cardTitle}>Payment list</h2>
        {loading ? (
          <div className={styles.emptyState}>Loading payments…</div>
        ) : items.length === 0 ? (
          <div className={styles.emptyState}>No payments found.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.payment_id}>
                    <td>{item.payment_id}</td>
                    <td>{item.order_id}</td>
                    <td>{item.payment_method}</td>
                    <td>{item.payment_status}</td>
                    <td>{item.payment_date}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <button className={`${styles.button} ${styles.secondaryButton}`} type="button" onClick={() => startEdit(item)}>
                          Edit
                        </button>
                        <button className={`${styles.button} ${styles.dangerButton}`} type="button" onClick={() => handleDelete(item.payment_id)} disabled={saving}>
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




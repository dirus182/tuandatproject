import React, { useEffect, useMemo, useState } from 'react'
import { createReview, deleteReview, getReviews, updateReview } from '../services/reviewService'
import type { Review } from '../services/reviewService'
import styles from '../components/AdminCrud.module.css'

const EMPTY_FORM: Review = {
  order_detail_id: 0,
  customer_comment: '',
  rating: 5,
}

export function ReviewsPage() {
  const [items, setItems] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Review>(EMPTY_FORM)

  useEffect(() => {
    void load()
  }, [])

  const isEditing = useMemo(() => editingId !== null, [editingId])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      setItems(await getReviews())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  function startEdit(item: Review) {
    setEditingId(item.reviews_id ?? null)
    setForm({
      order_detail_id: item.order_detail_id,
      customer_comment: item.customer_comment ?? '',
      rating: item.rating ?? 5,
      create_at: item.create_at ?? item.created_at,
      created_at: item.created_at ?? item.create_at,
    })
  }

  async function handleDelete(id?: number) {
    if (!id) return
    setSaving(true)
    setError(null)
    try {
      await deleteReview(id)
      if (editingId === id) resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete review')
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
        await updateReview(editingId, form)
      } else {
        await createReview(form)
      }

      resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save review')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Admin API</span>
          <h1 className={styles.title}>Reviews</h1>
          <p className={styles.subtitle}>Manage customer feedback connected to order details.</p>
        </div>
        <span className={styles.status}>{loading ? 'Refreshing…' : `${items.length} records`}</span>
      </div>

      {error && <div className={styles.card} style={{ borderColor: '#e7b4b4', color: '#9b3d3d' }}>{error}</div>}

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>{isEditing ? 'Edit review' : 'Create review'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <label className={styles.formField}>
              <span className={styles.label}>Order detail ID</span>
              <input className={styles.input} type="number" value={form.order_detail_id} onChange={(e) => setForm({ ...form, order_detail_id: Number(e.target.value) })} />
            </label>
            <label className={styles.formField}>
              <span className={styles.label}>Rating</span>
              <input className={styles.input} type="number" min={1} max={5} value={form.rating ?? 5} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
            </label>
            <label className={`${styles.formField} ${styles.span2}`}>
              <span className={styles.label}>Comment</span>
              <textarea className={styles.textarea} value={form.customer_comment ?? ''} onChange={(e) => setForm({ ...form, customer_comment: e.target.value })} />
            </label>
          </div>

          <div className={styles.actionsRow}>
            <button className={`${styles.button} ${styles.primaryButton}`} type="submit" disabled={saving}>
              {saving ? 'Saving…' : isEditing ? 'Update review' : 'Create review'}
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
        <h2 className={styles.cardTitle}>Review list</h2>
        {loading ? (
          <div className={styles.emptyState}>Loading reviews…</div>
        ) : items.length === 0 ? (
          <div className={styles.emptyState}>No reviews found.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order detail</th>
                  <th>Comment</th>
                  <th>Rating</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((review) => (
                  <tr key={review.reviews_id}>
                    <td>{review.reviews_id}</td>
                    <td>{review.order_detail_id}</td>
                    <td>{review.customer_comment}</td>
                    <td>{review.rating}</td>
                    <td>{review.create_at ?? review.created_at}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <button className={`${styles.button} ${styles.secondaryButton}`} type="button" onClick={() => startEdit(review)}>
                          Edit
                        </button>
                        <button className={`${styles.button} ${styles.dangerButton}`} type="button" onClick={() => handleDelete(review.reviews_id)} disabled={saving}>
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




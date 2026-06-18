import React, { useEffect, useMemo, useState } from 'react'
import styles from '../components/AdminCrud.module.css'
import type { BackendProduct } from '../services/productService'
import * as productService from '../services/productService'

const EMPTY_FORM: Partial<BackendProduct> = {
  cake_name: '',
  price: 0,
  quantity: 0,
  option_cake_id: 1,
  description: [],
}

export function ProductsPage() {
  const [items, setItems] = useState<BackendProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Partial<BackendProduct>>(EMPTY_FORM)

  useEffect(() => { void load() }, [])

  const isEditing = useMemo(() => editingId !== null, [editingId])

  async function load() {
    setLoading(true)
    setError(null)
      try {
      setItems(await productService.getBackendProducts())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  function startEdit(item: BackendProduct) {
    setEditingId(item.cake_id)
    setForm({
      cake_name: item.cake_name,
      price: Number(item.price ?? 0),
      quantity: item.quantity ?? 0,
      option_cake_id: item.option_cake_id ?? 1,
      description: item.description ?? [],
    })
  }

  async function handleDelete(id?: number) {
    if (!id) return
    setSaving(true)
    setError(null)
      try {
      await productService.deleteProduct(id)
      if (editingId === id) resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product')
    } finally {
      setSaving(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const payload: Partial<BackendProduct> = {
        cake_name: form.cake_name ?? '',
        price: form.price ?? 0,
        quantity: form.quantity ?? 0,
        option_cake_id: form.option_cake_id ?? 1,
        description: typeof form.description === 'string' ? [form.description] : form.description ?? [],
      }

      if (editingId !== null) {
        await productService.updateProduct(editingId, payload)
      } else {
        await productService.createProduct(payload)
      }

      resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Admin API</span>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>Manage product catalog (create / edit / delete)</p>
        </div>
        <span className={styles.status}>{loading ? 'Refreshing…' : `${items.length} records`}</span>
      </div>

      {error && <div className={styles.card} style={{ borderColor: '#e7b4b4', color: '#9b3d3d' }}>{error}</div>}

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>{isEditing ? 'Edit product' : 'Create product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <label className={styles.formField}>
              <span className={styles.label}>Name</span>
              <input className={styles.input} maxLength={20} value={form.cake_name ?? ''} onChange={(e) => setForm({ ...form, cake_name: e.target.value })} />
            </label>

            <label className={styles.formField}>
              <span className={styles.label}>Price</span>
              <input className={styles.input} type="number" value={form.price ?? 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
            </label>

            <label className={styles.formField}>
              <span className={styles.label}>Quantity</span>
              <input className={styles.input} type="number" value={form.quantity ?? 0} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
            </label>

            <label className={`${styles.formField} ${styles.span2}`}>
              <span className={styles.label}>Description (single-line will be stored as single array item)</span>
              <input className={styles.input} value={(Array.isArray(form.description) ? form.description.join(' ') : form.description) ?? ''} onChange={(e) => setForm({ ...form, description: [e.target.value] })} />
            </label>

            <label className={styles.formField}>
              <span className={styles.label}>Option (option_cake_id)</span>
              <input className={styles.input} type="number" value={form.option_cake_id ?? 1} onChange={(e) => setForm({ ...form, option_cake_id: Number(e.target.value) })} />
            </label>
          </div>

          <div className={styles.actionsRow}>
            <button className={`${styles.button} ${styles.primaryButton}`} type="submit" disabled={saving}>
              {saving ? 'Saving…' : isEditing ? 'Update product' : 'Create product'}
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
        <h2 className={styles.cardTitle}>Product list</h2>
        {loading ? (
          <div className={styles.emptyState}>Loading products…</div>
        ) : items.length === 0 ? (
          <div className={styles.emptyState}>No products found.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Option</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.cake_id}>
                    <td>{p.cake_id}</td>
                    <td>{p.cake_name}</td>
                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>{p.option_cake_id}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <button className={`${styles.button} ${styles.secondaryButton}`} type="button" onClick={() => startEdit(p)}>
                          Edit
                        </button>
                        <button className={`${styles.button} ${styles.dangerButton}`} type="button" onClick={() => handleDelete(p.cake_id)} disabled={saving}>
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

export default ProductsPage




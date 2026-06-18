import React, { useEffect, useMemo, useState } from 'react'
import { createOption, deleteOption, getOptions, updateOption } from '../services/optionService'
import type { OptionCake } from '../services/optionService'
import { getBackendProducts } from '../services/productService'
import type { BackendProduct } from '../services/productService'
import styles from '../components/AdminCrud.module.css'

const EMPTY_FORM: OptionCake = { category_name: '' }

export function OptionsPage() {
  const [items, setItems] = useState<OptionCake[]>([])
  const [productsByOption, setProductsByOption] = useState<Record<number, BackendProduct[]>>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<OptionCake>(EMPTY_FORM)

  useEffect(() => {
    void load()
  }, [])

  const isEditing = useMemo(() => editingId !== null, [editingId])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const [options, backendProducts] = await Promise.all([getOptions(), getBackendProducts()])
      setItems(options)

      // group products by option_cake_id
      const map: Record<number, BackendProduct[]> = {}
      for (const p of backendProducts) {
        const key = p.option_cake_id == null ? 0 : Number(p.option_cake_id)
        if (!map[key]) map[key] = []
        map[key].push(p)
      }
      setProductsByOption(map)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load options')
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  function startEdit(item: OptionCake) {
    setEditingId(item.option_cake_id ?? null)
    setForm({ category_name: item.category_name })
  }

  async function handleDelete(id?: number) {
    if (!id) return
    setSaving(true)
    setError(null)
    try {
      await deleteOption(id)
      if (editingId === id) resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete option')
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
        await updateOption(editingId, form)
      } else {
        await createOption(form)
      }

      resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save option')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Admin API</span>
          <h1 className={styles.title}>Option Cakes</h1>
          <p className={styles.subtitle}>Manage bakery categories exposed by the backend option controller.</p>
        </div>
        <span className={styles.status}>{loading ? 'Refreshing…' : `${items.length} records`}</span>
      </div>

      {error && <div className={styles.card} style={{ borderColor: '#e7b4b4', color: '#9b3d3d' }}>{error}</div>}

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>{isEditing ? 'Edit option' : 'Create option'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <label className={`${styles.formField} ${styles.span2}`}>
              <span className={styles.label}>Category name</span>
              <input className={styles.input} value={form.category_name} onChange={(e) => setForm({ category_name: e.target.value })} />
            </label>
          </div>

          <div className={styles.actionsRow}>
            <button className={`${styles.button} ${styles.primaryButton}`} type="submit" disabled={saving}>
              {saving ? 'Saving…' : isEditing ? 'Update option' : 'Create option'}
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
        <h2 className={styles.cardTitle}>Option list</h2>
        {loading ? (
          <div className={styles.emptyState}>Loading options…</div>
        ) : items.length === 0 ? (
          <div className={styles.emptyState}>No options found.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Products</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const prods = item.option_cake_id != null ? productsByOption[Number(item.option_cake_id)] ?? [] : []
                  return (
                    <React.Fragment key={item.option_cake_id}>
                      <tr>
                        <td>{item.option_cake_id}</td>
                        <td>{item.category_name}</td>
                        <td>{prods.length} products</td>
                        <td>
                          <div className={styles.rowActions}>
                            <button className={`${styles.button} ${styles.secondaryButton}`} type="button" onClick={() => startEdit(item)}>
                              Edit
                            </button>
                            <button className={`${styles.button} ${styles.secondaryButton}`} type="button" onClick={() => {
                              const el = document.getElementById(`option-products-${item.option_cake_id}`)
                              if (el) el.style.display = el.style.display === 'table-row' ? 'none' : 'table-row'
                            }}>
                              View products
                            </button>
                            <button className={`${styles.button} ${styles.dangerButton}`} type="button" onClick={() => handleDelete(item.option_cake_id)} disabled={saving}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr id={`option-products-${item.option_cake_id}`} style={{ display: 'none', background: '#fafafa' }}>
                        <td colSpan={4}>
                          {prods.length === 0 ? (
                            <div style={{ padding: 10 }}>No products for this option.</div>
                          ) : (
                            <div style={{ padding: 10 }}>
                              <strong>Products:</strong>
                              <ul style={{ marginTop: 8 }}>
                                {prods.map((p) => (
                                  <li key={p.cake_id}>{p.cake_name} — price: {p.price} — qty: {p.quantity}</li>
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

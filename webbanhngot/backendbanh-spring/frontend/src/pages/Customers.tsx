import React, { useEffect, useMemo, useState } from 'react'
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from '../services/customerService'
import type { Customer } from '../services/customerService'
import styles from '../components/AdminCrud.module.css'

const EMPTY_FORM: Customer = {
  phone_number: '',
  first_name: '',
  last_name: '',
  customer_email: '',
  address_id: '',
}

export function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Customer>(EMPTY_FORM)

  useEffect(() => {
    void load()
  }, [])

  const isEditing = useMemo(() => editingId !== null, [editingId])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      setCustomers(await getCustomers())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load customers')
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  function startEdit(customer: Customer) {
    setEditingId(customer.customer_id ?? null)
    setForm({
      phone_number: customer.phone_number,
      first_name: customer.first_name,
      last_name: customer.last_name,
      customer_email: customer.customer_email,
      address_id: customer.address_id,
    })
  }

  async function handleDelete(id?: number) {
    if (!id) return
    setSaving(true)
    setError(null)
    try {
      await deleteCustomer(id)
      if (editingId === id) resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete customer')
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
        await updateCustomer(editingId, form)
      } else {
        await createCustomer(form)
      }

      resetForm()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save customer')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Admin API</span>
          <h1 className={styles.title}>Customers</h1>
          <p className={styles.subtitle}>Create, edit, and manage customer records through the backend API.</p>
        </div>
        <div className={styles.toolbar}>
          <span className={styles.status}>{loading ? 'Refreshing…' : `${customers.length} records`}</span>
        </div>
      </div>

      {error && <div className={styles.card} style={{ borderColor: '#e7b4b4', color: '#9b3d3d' }}>{error}</div>}

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>{isEditing ? 'Edit customer' : 'Create customer'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <label className={styles.formField}>
              <span className={styles.label}>Phone number</span>
              <input className={styles.input} value={form.phone_number} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} />
            </label>
            <label className={styles.formField}>
              <span className={styles.label}>Email</span>
              <input className={styles.input} value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} />
            </label>
            <label className={styles.formField}>
              <span className={styles.label}>First name</span>
              <input className={styles.input} value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
            </label>
            <label className={styles.formField}>
              <span className={styles.label}>Last name</span>
              <input className={styles.input} value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
            </label>
            <label className={`${styles.formField} ${styles.span2}`}>
              <span className={styles.label}>Address</span>
              <input className={styles.input} value={form.address_id} onChange={(e) => setForm({ ...form, address_id: e.target.value })} />
            </label>
          </div>

          <div className={styles.actionsRow}>
            <button className={`${styles.button} ${styles.primaryButton}`} type="submit" disabled={saving}>
              {saving ? 'Saving…' : isEditing ? 'Update customer' : 'Create customer'}
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
        <h2 className={styles.cardTitle}>Customer list</h2>
        {loading ? (
          <div className={styles.emptyState}>Loading customers…</div>
        ) : customers.length === 0 ? (
          <div className={styles.emptyState}>No customers found.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.first_name} {customer.last_name}</td>
                    <td>{customer.phone_number}</td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.address_id}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <button className={`${styles.button} ${styles.secondaryButton}`} type="button" onClick={() => startEdit(customer)}>
                          Edit
                        </button>
                        <button className={`${styles.button} ${styles.dangerButton}`} type="button" onClick={() => handleDelete(customer.customer_id)} disabled={saving}>
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




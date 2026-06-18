import { useState } from 'react'
import { Input, Button, Row, Col, Empty, Spin } from 'antd'
import { Header, Footer, ProductCard } from '../components'
import { searchProducts, getSuggestions } from '../services/productService'
import type { Product } from '../types'
import styles from './Search.module.css'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const handleSearch = async () => {
    setError(undefined)
    setLoading(true)
    try {
      if (!query.trim()) {
        // empty query => show suggestions
        setResults(await getSuggestions(8))
      } else {
        setResults(await searchProducts(query))
      }
    } catch (e) {
      console.error('Search failed', e)
      setError('Search thất bại. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.container} style={{ padding: '24px 0' }}>
        <h1>Search</h1>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <Input
            placeholder="Search products or categories"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Button type="primary" onClick={handleSearch} loading={loading}>
            Search
          </Button>
        </div>

        {loading && (
          <div style={{ display: 'grid', placeItems: 'center', padding: 24 }}>
            <Spin />
          </div>
        )}

        {error && <div style={{ color: 'red' }}>{error}</div>}

        {!loading && results.length === 0 && <Empty description="No results" />}

        {!loading && results.length > 0 && (
          <Row gutter={[24, 24]}>
            {results.map((p) => (
              <Col key={p.id} xs={24} sm={12} lg={6}>
                <ProductCard product={p} onAddToCart={() => {}} />
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Footer />
    </div>
  )
}


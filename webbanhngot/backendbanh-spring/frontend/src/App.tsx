import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { CollectionsPage } from './pages/Collections'
import { ProductDetailPage } from './pages/ProductDetail'
import { CartPage } from './pages/Cart'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  )
}

export default App

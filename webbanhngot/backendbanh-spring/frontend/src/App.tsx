import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AdminRoute } from './components'
import { HomePage } from './pages/Home'
import { CollectionsPage } from './pages/Collections'
import { ProductDetailPage } from './pages/ProductDetail'
import { CartPage } from './pages/Cart'
import { CheckoutSuccessPage } from './pages/CheckoutSuccess'
import { AdminLoginPage } from './pages/AdminLogin'
import { AdminPage } from './pages/Admin'
import { ProductsPage } from './pages/Products'
import { CustomersPage } from './pages/Customers'
import { OrdersPage } from './pages/Orders'
import { OptionsPage } from './pages/Options'
import { PaymentsPage } from './pages/Payments'
import { OrderDetailsPage } from './pages/OrderDetails'
import { ReviewsPage } from './pages/Reviews'
import { SearchPage } from './pages/Search'
import { OurStoryPage } from './pages/OurStory'
import { WholesalePage } from './pages/Wholesale'
import { ContactPage } from './pages/Contact'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/wholesale" element={<WholesalePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><ProductsPage /></AdminRoute>} />
        <Route path="/admin/customers" element={<AdminRoute><CustomersPage /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><OrdersPage /></AdminRoute>} />
        <Route path="/admin/options" element={<AdminRoute><OptionsPage /></AdminRoute>} />
        <Route path="/admin/payments" element={<AdminRoute><PaymentsPage /></AdminRoute>} />
        <Route path="/admin/order-details" element={<AdminRoute><OrderDetailsPage /></AdminRoute>} />
        <Route path="/admin/reviews" element={<AdminRoute><ReviewsPage /></AdminRoute>} />
      </Routes>
    </Router>
  )
}

export default App

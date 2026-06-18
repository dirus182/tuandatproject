import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { CollectionsPage } from './pages/Collections'
import { ProductDetailPage } from './pages/ProductDetail'
import { CartPage } from './pages/Cart'
import { CheckoutSuccessPage } from './pages/CheckoutSuccess'
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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/customers" element={<CustomersPage />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
        <Route path="/admin/options" element={<OptionsPage />} />
        <Route path="/admin/payments" element={<PaymentsPage />} />
        <Route path="/admin/order-details" element={<OrderDetailsPage />} />
        <Route path="/admin/reviews" element={<ReviewsPage />} />
      </Routes>
    </Router>
  )
}

export default App

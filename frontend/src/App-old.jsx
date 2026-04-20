import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'

import RootLayout       from './components/layouts/RootLayout'
import DashboardLayout  from './components/layouts/DashboardLayout'
import StorefrontLayout from './components/layouts/StorefrontLayout'
import AdminLayout      from './components/layouts/AdminLayout'

// Auth
import LoginPage          from './pages/auth/LoginPage'
import RegisterPage       from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'

// Public
import LandingPage    from './pages/public/LandingPage'
import StoresPage     from './pages/public/StoresPage'
import MarketplacePage from './pages/public/MarketplacePage'

// Storefront
import StorefrontHome     from './pages/storefront/StorefrontHome'
import ProductListPage    from './pages/storefront/ProductListPage'
import ProductDetailPage  from './pages/storefront/ProductDetailPage'
import CartPage           from './pages/storefront/CartPage'
import CheckoutPage       from './pages/storefront/CheckoutPage'
import OrderSuccessPage   from './pages/storefront/OrderSuccessPage'
import OrderTrackingPage  from './pages/storefront/OrderTrackingPage'
import CustomerOrdersPage from './pages/storefront/CustomerOrdersPage'

// Customer
import CustomerDashboard  from './pages/customer/CustomerDashboard'

// Vendor
import VendorDashboard    from './pages/vendor/VendorDashboard'
import VendorProducts     from './pages/vendor/VendorProducts'
import VendorProductForm  from './pages/vendor/VendorProductForm'
import VendorOrders       from './pages/vendor/VendorOrders'
import VendorOrderDetail  from './pages/vendor/VendorOrderDetail'
import VendorCategories   from './pages/vendor/VendorCategories'
import VendorCoupons      from './pages/vendor/VendorCoupons'
import VendorSettings     from './pages/vendor/VendorSettings'
import VendorAnalytics    from './pages/vendor/VendorAnalytics'
import VendorCustomers    from './pages/vendor/VendorCustomers'
import VendorBilling      from './pages/vendor/VendorBilling'
import VendorAttributes   from './pages/vendor/VendorAttributes'
import VendorBanners      from './pages/vendor/VendorBanners'

// Admin
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStores    from './pages/admin/AdminStores'
import AdminUsers     from './pages/admin/AdminUsers'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminBanners   from './pages/admin/AdminBanners'

const ProtectedRoute = ({ children, roles }) => {
  const { user, isAuthenticated } = useSelector(s => s.auth)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user?.role)) return <Navigate to="/" replace />
  return children
}

const GuestRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector(s => s.auth)
  if (isAuthenticated) {
    if (user?.role === 'super_admin') return <Navigate to="/admin" replace />
    if (user?.role === 'vendor')      return <Navigate to="/dashboard" replace />
    return <Navigate to="/" replace />
  }
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" gutter={8} toastOptions={{
        duration: 3500,
        style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', fontWeight: '500', borderRadius: '12px', padding: '12px 16px' },
        success: { iconTheme: { primary: '#6366f1', secondary: '#fff' } },
      }} />

      <Routes>
        {/* Public */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="stores"      element={<StoresPage />} />
          <Route path="marketplace" element={<MarketplacePage />} />
        </Route>

        {/* Auth */}
        <Route path="/login"           element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/register"        element={<GuestRoute><RegisterPage /></GuestRoute>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Customer Dashboard */}
        <Route path="/account" element={<ProtectedRoute roles={['customer','vendor','super_admin']}><RootLayout /></ProtectedRoute>}>
          <Route index element={<CustomerDashboard />} />
        </Route>

        {/* Storefront (multi-tenant) */}
        <Route path="/store/:storeSlug" element={<StorefrontLayout />}>
          <Route index element={<StorefrontHome />} />
          <Route path="products"                element={<ProductListPage />} />
          <Route path="products/:idOrSlug"      element={<ProductDetailPage />} />
          <Route path="cart"                    element={<CartPage />} />
          <Route path="checkout"                element={<CheckoutPage />} />
          <Route path="order-success/:orderId"  element={<OrderSuccessPage />} />
          <Route path="track/:orderId"          element={<OrderTrackingPage />} />
          <Route path="my-orders"               element={<ProtectedRoute roles={['customer','vendor']}><CustomerOrdersPage /></ProtectedRoute>} />
        </Route>

        {/* Vendor Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute roles={['vendor']}><DashboardLayout /></ProtectedRoute>}>
          <Route index                        element={<VendorDashboard />} />
          <Route path="products"              element={<VendorProducts />} />
          <Route path="products/new"          element={<VendorProductForm />} />
          <Route path="products/:id/edit"     element={<VendorProductForm />} />
          <Route path="orders"                element={<VendorOrders />} />
          <Route path="orders/:id"            element={<VendorOrderDetail />} />
          <Route path="categories"            element={<VendorCategories />} />
          <Route path="attributes"            element={<VendorAttributes />} />
          <Route path="coupons"               element={<VendorCoupons />} />
          <Route path="banners"               element={<VendorBanners />} />
          <Route path="customers"             element={<VendorCustomers />} />
          <Route path="analytics"             element={<VendorAnalytics />} />
          <Route path="billing"               element={<VendorBilling />} />
          <Route path="settings"              element={<VendorSettings />} />
        </Route>

        {/* Super Admin */}
        <Route path="/admin" element={<ProtectedRoute roles={['super_admin']}><AdminLayout /></ProtectedRoute>}>
          <Route index              element={<AdminDashboard />} />
          <Route path="stores"      element={<AdminStores />} />
          <Route path="users"       element={<AdminUsers />} />
          <Route path="banners"     element={<AdminBanners />} />
          <Route path="analytics"   element={<AdminAnalytics />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

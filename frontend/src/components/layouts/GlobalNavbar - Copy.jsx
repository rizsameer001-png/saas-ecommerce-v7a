import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { User as UserIcon } from 'lucide-react'
import api from '../../api/axios'
import {
  Store, Search, ShoppingCart, User, LogOut, LayoutDashboard,
  ShieldCheck, Sparkles, Tag, ChevronDown, X, TrendingUp, Flame, Star
} from 'lucide-react'

const LABEL_MENUS = [
  { key: 'newArrival', label: 'New Arrivals', icon: Sparkles, color: 'text-emerald-600', bg: 'bg-emerald-50', accent: '#059669' },
  { key: 'onSale',    label: 'On Sale',      icon: Flame,    color: 'text-red-600',     bg: 'bg-red-50',     accent: '#dc2626' },
  { key: 'featured',  label: 'Featured',     icon: Star,     color: 'text-amber-600',   bg: 'bg-amber-50',   accent: '#d97706' },
]

function LabelDropdown({ menuKey, label, icon: Icon, color, bg, accent }) {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleOpen = async () => {
    setOpen(true)
    if (products.length) return
    setLoading(true)
    try {
      const { data } = await api.get(`/products/labeled?label=${menuKey}&limit=6`)
      setProducts(data.data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  return (
    <div className="relative" ref={ref}>
{/*      <button
        onMouseEnter={handleOpen}
        onClick={handleOpen}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all hover:${bg} ${color} group`}
      >*/}
        <Link
          to={`/marketplace?label=${menuKey}`}
          onMouseEnter={handleOpen}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all hover:${bg} ${color} group`}
        >
        <Icon size={14} />
        {label}
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </Link>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between"
            style={{ background: `${accent}10` }}>
            <div className="flex items-center gap-2">
              <Icon size={16} style={{ color: accent }} />
              <span className="font-display font-bold text-gray-900">{label}</span>
            </div>
            <Link to={`/marketplace?label=${menuKey}`} className="text-xs font-semibold hover:underline" style={{ color: accent }}>
              View all →
            </Link>
          </div>

          {/* Products grid */}
          <div className="p-4">
            {loading ? (
              <div className="grid grid-cols-3 gap-3">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="skeleton aspect-square rounded-xl" />
                    <div className="skeleton h-3 w-full rounded" />
                    <div className="skeleton h-3 w-1/2 rounded" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-6">No products yet</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {products.map(product => {
                  const img = product.images?.find(i => i.isPrimary)?.url || product.images?.[0]?.url
                  return (
                    <Link
                      key={product._id}
                      to={`/store/${product.store?.slug}/products/${product.slug || product._id}`}
                      onClick={() => setOpen(false)}
                      className="group block"
                    >
                      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-2 relative">
                        {img ? (
                          <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300"><Store size={20} /></div>
                        )}
                        {product.discountPercent > 0 && (
                          <span className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                            -{product.discountPercent}%
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">{product.name}</p>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-xs font-bold text-gray-900">${product.price?.toFixed(2)}</span>
                        {product.comparePrice > product.price && (
                          <span className="text-[10px] text-gray-400 line-through">${product.comparePrice?.toFixed(2)}</span>
                        )}
                      </div>
                      {product.store && (
                        <p className="text-[10px] text-gray-400 mt-0.5 truncate">{product.store.name}</p>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function GlobalNavbar() {
  const { user, isAuthenticated } = useSelector(s => s.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userRef = useRef()

  useEffect(() => {
    const handler = (e) => { if (userRef.current && !userRef.current.contains(e.target)) setUserMenuOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) navigate(`/marketplace?search=${encodeURIComponent(search)}`)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 mr-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Store size={15} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg text-gray-900 hidden sm:block">SaaSStore</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-lg hidden md:flex">
          <div className="relative w-full">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products across all stores..."
              className="input pl-10 w-full text-sm rounded-full"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <Link to="/stores" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors">
            <Store size={14} /> Stores
          </Link>

          {isAuthenticated ? (
            <div className="relative" ref={userRef}>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-indigo-600">{user?.name?.[0]?.toUpperCase()}</span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name?.split(' ')[0]}</span>
                <ChevronDown size={13} className="text-gray-400" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-slide-up">
                  <div className="px-4 py-3 border-b border-gray-50">
                    <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                  {user?.role === 'vendor' && (
                    <button onClick={() => { navigate('/dashboard'); setUserMenuOpen(false) }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <LayoutDashboard size={14} /> Dashboard
                    </button>
                  )}
                  {user?.role === 'super_admin' && (
                    <button onClick={() => { navigate('/admin'); setUserMenuOpen(false) }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <ShieldCheck size={14} /> Admin Panel
                    </button>
                  )}
                  <button onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-secondary text-sm">Sign In</Link>
              <Link to="/register" className="btn-primary text-sm">Start Selling</Link>
            </>
          )}
        </div>
      </div>

      {/* Secondary nav - labeled menus */}
      <div className="border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto scrollbar-thin">
          <Link to="/marketplace" className="flex-shrink-0 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5">
            <TrendingUp size={13} /> Marketplace
          </Link>
{/*          {LABEL_MENUS.map(menu => (
            <div key={menu.key} className="flex-shrink-0">
              <LabelDropdown {...menu} />
            </div>
          ))}*/}
          
          {LABEL_MENUS.map(menu => (
          <div key={menu.key} className="flex-shrink-0">
            <LabelDropdown
              menuKey={menu.key}   // 🔥 THIS FIXES YOUR BUG
              label={menu.label}
              icon={menu.icon}
              color={menu.color}
              bg={menu.bg}
              accent={menu.accent}
            />
          </div>
        ))}
          <Link to="/stores" className="flex-shrink-0 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors whitespace-nowrap">
            All Stores
          </Link>
        </div>
      </div>
    </header>
  )
}

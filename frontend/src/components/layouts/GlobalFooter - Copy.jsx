import { Link } from 'react-router-dom'
import { Store, Sparkles, Flame, Star, Instagram, Twitter, Facebook, Mail } from 'lucide-react'

export default function GlobalFooter() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Store size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">SaaSStore</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              The complete multi-tenant eCommerce platform for modern vendors.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                  <Icon size={14} className="text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Discover */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Discover</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'New Arrivals', to: '/marketplace?label=newArrival', icon: Sparkles, color: 'text-emerald-500' },
                { label: 'On Sale',      to: '/marketplace?label=onSale',     icon: Flame,    color: 'text-red-500' },
                { label: 'Featured',     to: '/marketplace?label=featured',   icon: Star,     color: 'text-amber-500' },
                { label: 'All Stores',   to: '/stores' },
                { label: 'Marketplace',  to: '/marketplace' },
              ].map(({ label, to, icon: Icon, color }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                    {Icon && <Icon size={12} className={color} />}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vendors */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Vendors</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Start Selling', to: '/register?role=vendor' },
                { label: 'Vendor Dashboard', to: '/dashboard' },
                { label: 'Pricing Plans', to: '/register' },
                { label: 'API Docs', to: '/docs' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-500 mb-3">Get the latest deals and new arrivals.</p>
            <form onSubmit={e => e.preventDefault()} className="flex gap-2">
              <input type="email" placeholder="your@email.com"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500" />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-xl transition-colors">
                <Mail size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">© 2025 SaaSStore Platform. All rights reserved.</p>
          <div className="flex gap-5 text-sm text-gray-600">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Support'].map(l => (
              <a key={l} href="#" className="hover:text-gray-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

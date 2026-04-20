import { Link } from 'react-router-dom'
import { Store, Zap, Shield, BarChart3, ShoppingCart, Package, Globe, ArrowRight, Check } from 'lucide-react'

const FEATURES = [
  { icon: Store, title: 'Multi-Tenant Stores', desc: 'Every vendor gets their own storefront with custom branding and domain.' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Built with React + Vite for blazing performance on any device.' },
  { icon: Shield, title: 'Secure Payments', desc: 'Stripe & Razorpay integration with webhook-verified transactions.' },
  { icon: BarChart3, title: 'Rich Analytics', desc: 'Vendor dashboards with sales charts, revenue tracking, and insights.' },
  { icon: Package, title: 'Inventory Management', desc: 'Track stock, variants, and get low-stock alerts automatically.' },
  { icon: Globe, title: 'Global Ready', desc: 'Multi-currency, tax configuration, and international shipping support.' },
]

const PLANS = [
  { name: 'Free', price: '$0', products: '10', orders: '100/mo', features: ['Basic storefront', 'COD payments', 'Email support'], color: 'gray' },
  { name: 'Basic', price: '$29', products: '100', orders: '1,000/mo', features: ['Custom domain', 'Stripe payments', 'Analytics', 'Priority support'], color: 'primary', popular: true },
  { name: 'Pro', price: '$79', products: '1,000', orders: '10,000/mo', features: ['Everything in Basic', 'Advanced analytics', 'API access', 'White-label', 'Dedicated support'], color: 'purple' },
]

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-purple-900 py-24 md:py-36">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-primary-200 mb-8">
            <Zap size={13} className="text-primary-300" />
            Complete SaaS eCommerce Platform
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Launch Your Store
            <span className="block text-gradient bg-gradient-to-r from-primary-300 to-purple-300 bg-clip-text text-transparent">
              In Minutes
            </span>
          </h1>

          <p className="text-lg text-primary-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            The complete multi-tenant SaaS eCommerce platform. Create your store, manage products, process orders, and grow your business — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register?role=vendor"
              className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-2xl font-bold text-base hover:bg-primary-50 transition-all active:scale-[0.98] shadow-lg">
              Start Selling Free <ArrowRight size={18} />
            </Link>
            <Link to="/stores"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-white/20 transition-all">
              <Store size={18} /> Browse Stores
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mt-16 text-center">
            {[['500+', 'Stores'], ['50K+', 'Products'], ['$2M+', 'Processed']].map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-display font-bold text-white">{n}</p>
                <p className="text-xs text-primary-300 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Everything you need to sell online
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From product management to payment processing, we've built every tool you need to run a successful online store.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-card-hover transition-all duration-300">
                <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-100 rounded-2xl flex items-center justify-center mb-4 transition-colors">
                  <Icon size={22} className="text-primary-600" />
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-500">Start free, scale as you grow. No hidden fees.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`relative rounded-3xl p-7 border-2 ${plan.popular ? 'border-primary-500 bg-primary-600 text-white shadow-glow-lg' : 'border-gray-200 bg-white'}`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <p className={`font-semibold text-sm ${plan.popular ? 'text-primary-200' : 'text-gray-500'}`}>{plan.name}</p>
                  <p className={`font-display text-4xl font-bold mt-1 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.price}<span className="text-base font-normal">/mo</span></p>
                </div>
                <div className={`text-sm space-y-1 mb-6 pb-6 border-b ${plan.popular ? 'border-primary-500' : 'border-gray-100'}`}>
                  <p className={plan.popular ? 'text-primary-200' : 'text-gray-500'}>{plan.products} products</p>
                  <p className={plan.popular ? 'text-primary-200' : 'text-gray-500'}>{plan.orders} orders</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={15} className={`flex-shrink-0 mt-0.5 ${plan.popular ? 'text-primary-200' : 'text-primary-500'}`} />
                      <span className={plan.popular ? 'text-primary-100' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register?role=vendor"
                  className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
                    plan.popular
                      ? 'bg-white text-primary-600 hover:bg-primary-50'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-700">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to start your store?
          </h2>
          <p className="text-primary-200 mb-8 text-lg">
            Join hundreds of vendors already selling on SaaSStore.
          </p>
          <Link to="/register"
            className="inline-flex items-center gap-2 bg-white text-primary-700 px-10 py-4 rounded-2xl font-bold text-base hover:bg-primary-50 transition-all shadow-lg">
            Create Free Store <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}

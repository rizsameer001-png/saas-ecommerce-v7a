// import { Link } from 'react-router-dom'
// import { Store, Zap, Shield, BarChart3, ShoppingCart, Package, Globe, ArrowRight, Check } from 'lucide-react'

// const FEATURES = [
//   { icon: Store, title: 'Multi-Tenant Stores', desc: 'Every vendor gets their own storefront with custom branding and domain.' },
//   { icon: Zap, title: 'Lightning Fast', desc: 'Built with React + Vite for blazing performance on any device.' },
//   { icon: Shield, title: 'Secure Payments', desc: 'Stripe & Razorpay integration with webhook-verified transactions.' },
//   { icon: BarChart3, title: 'Rich Analytics', desc: 'Vendor dashboards with sales charts, revenue tracking, and insights.' },
//   { icon: Package, title: 'Inventory Management', desc: 'Track stock, variants, and get low-stock alerts automatically.' },
//   { icon: Globe, title: 'Global Ready', desc: 'Multi-currency, tax configuration, and international shipping support.' },
// ]

// const PLANS = [
//   { name: 'Free', price: '$0', products: '10', orders: '100/mo', features: ['Basic storefront', 'COD payments', 'Email support'], color: 'gray' },
//   { name: 'Basic', price: '$29', products: '100', orders: '1,000/mo', features: ['Custom domain', 'Stripe payments', 'Analytics', 'Priority support'], color: 'primary', popular: true },
//   { name: 'Pro', price: '$79', products: '1,000', orders: '10,000/mo', features: ['Everything in Basic', 'Advanced analytics', 'API access', 'White-label', 'Dedicated support'], color: 'purple' },
// ]

// export default function LandingPage() {
//   return (
//     <div>
//       {/* Hero */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-purple-900 py-24 md:py-36">
//         <div className="absolute inset-0 bg-grid opacity-20" />
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
//         <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

//         <div className="relative max-w-5xl mx-auto px-6 text-center">
//           <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-primary-200 mb-8">
//             <Zap size={13} className="text-primary-300" />
//             Complete SaaS eCommerce Platform
//           </div>

//           <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
//             Launch Your Store
//             <span className="block text-gradient bg-gradient-to-r from-primary-300 to-purple-300 bg-clip-text text-transparent">
//               In Minutes
//             </span>
//           </h1>

//           <p className="text-lg text-primary-200 max-w-2xl mx-auto mb-10 leading-relaxed">
//             The complete multi-tenant SaaS eCommerce platform. Create your store, manage products, process orders, and grow your business — all in one place.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link to="/register?role=vendor"
//               className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-2xl font-bold text-base hover:bg-primary-50 transition-all active:scale-[0.98] shadow-lg">
//               Start Selling Free <ArrowRight size={18} />
//             </Link>
//             <Link to="/stores"
//               className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-white/20 transition-all">
//               <Store size={18} /> Browse Stores
//             </Link>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mt-16 text-center">
//             {[['500+', 'Stores'], ['50K+', 'Products'], ['$2M+', 'Processed']].map(([n, l]) => (
//               <div key={l}>
//                 <p className="text-2xl font-display font-bold text-white">{n}</p>
//                 <p className="text-xs text-primary-300 mt-0.5">{l}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="text-center mb-14">
//             <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
//               Everything you need to sell online
//             </h2>
//             <p className="text-gray-500 max-w-xl mx-auto">
//               From product management to payment processing, we've built every tool you need to run a successful online store.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {FEATURES.map(({ icon: Icon, title, desc }) => (
//               <div key={title} className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-card-hover transition-all duration-300">
//                 <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-100 rounded-2xl flex items-center justify-center mb-4 transition-colors">
//                   <Icon size={22} className="text-primary-600" />
//                 </div>
//                 <h3 className="font-display font-bold text-gray-900 mb-2">{title}</h3>
//                 <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Pricing */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-5xl mx-auto px-6">
//           <div className="text-center mb-14">
//             <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
//             <p className="text-gray-500">Start free, scale as you grow. No hidden fees.</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {PLANS.map((plan) => (
//               <div key={plan.name} className={`relative rounded-3xl p-7 border-2 ${plan.popular ? 'border-primary-500 bg-primary-600 text-white shadow-glow-lg' : 'border-gray-200 bg-white'}`}>
//                 {plan.popular && (
//                   <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs font-bold px-4 py-1 rounded-full">
//                     Most Popular
//                   </div>
//                 )}
//                 <div className="mb-6">
//                   <p className={`font-semibold text-sm ${plan.popular ? 'text-primary-200' : 'text-gray-500'}`}>{plan.name}</p>
//                   <p className={`font-display text-4xl font-bold mt-1 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.price}<span className="text-base font-normal">/mo</span></p>
//                 </div>
//                 <div className={`text-sm space-y-1 mb-6 pb-6 border-b ${plan.popular ? 'border-primary-500' : 'border-gray-100'}`}>
//                   <p className={plan.popular ? 'text-primary-200' : 'text-gray-500'}>{plan.products} products</p>
//                   <p className={plan.popular ? 'text-primary-200' : 'text-gray-500'}>{plan.orders} orders</p>
//                 </div>
//                 <ul className="space-y-3 mb-8">
//                   {plan.features.map(f => (
//                     <li key={f} className="flex items-start gap-2.5 text-sm">
//                       <Check size={15} className={`flex-shrink-0 mt-0.5 ${plan.popular ? 'text-primary-200' : 'text-primary-500'}`} />
//                       <span className={plan.popular ? 'text-primary-100' : 'text-gray-600'}>{f}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <Link to="/register?role=vendor"
//                   className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
//                     plan.popular
//                       ? 'bg-white text-primary-600 hover:bg-primary-50'
//                       : 'bg-primary-600 text-white hover:bg-primary-700'
//                   }`}>
//                   Get Started
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-700">
//         <div className="max-w-3xl mx-auto px-6 text-center">
//           <h2 className="font-display text-4xl font-bold text-white mb-4">
//             Ready to start your store?
//           </h2>
//           <p className="text-primary-200 mb-8 text-lg">
//             Join hundreds of vendors already selling on SaaSStore.
//           </p>
//           <Link to="/register"
//             className="inline-flex items-center gap-2 bg-white text-primary-700 px-10 py-4 rounded-2xl font-bold text-base hover:bg-primary-50 transition-all shadow-lg">
//             Create Free Store <ArrowRight size={18} />
//           </Link>
//         </div>
//       </section>
//     </div>
//   )
// }

// import { Link } from 'react-router-dom'
// import { Store, Zap, Shield, BarChart3, Package, Globe, ArrowRight, Check } from 'lucide-react'

// const FEATURES = [
//   { icon: Store, title: 'Multi-Tenant Stores', desc: 'Every vendor gets their own storefront with custom branding and domain.' },
//   { icon: Zap, title: 'Lightning Fast', desc: 'Built with React + Vite for blazing performance on any device.' },
//   { icon: Shield, title: 'Secure Payments', desc: 'Stripe & Razorpay integration with webhook-verified transactions.' },
//   { icon: BarChart3, title: 'Rich Analytics', desc: 'Vendor dashboards with insights and revenue tracking.' },
//   { icon: Package, title: 'Inventory Management', desc: 'Track stock, variants, and low-stock alerts.' },
//   { icon: Globe, title: 'Global Ready', desc: 'Multi-currency, tax configuration, international support.' },
// ]

// const PLANS = [
//   { name: 'Free', price: '$0', products: '10', orders: '100/mo', features: ['Basic storefront', 'COD payments', 'Email support'] },
//   { name: 'Basic', price: '$29', products: '100', orders: '1,000/mo', features: ['Custom domain', 'Stripe payments', 'Analytics', 'Priority support'], popular: true },
//   { name: 'Pro', price: '$79', products: '1,000', orders: '10,000/mo', features: ['Everything in Basic', 'Advanced analytics', 'API access', 'White-label'] },
// ]

// export default function LandingPage() {
//   return (
//     <div className="bg-white">

//       {/* HERO */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 py-28">

//         {/* Glow blobs */}
//         <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/30 blur-3xl rounded-full" />
//         <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full" />

//         {/* Grid overlay */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:20px_20px]" />

//         <div className="relative max-w-6xl mx-auto px-6 text-center text-white">

//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur">
//             <Zap size={14} className="text-indigo-300" />
//             <span className="text-sm">Next-gen SaaS eCommerce Platform</span>
//           </div>

//           <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
//             Build Your Store
//             <span className="block bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent animate-gradient">
//               Faster Than Ever
//             </span>
//           </h1>

//           <p className="text-lg text-indigo-200 max-w-2xl mx-auto mb-10">
//             Launch, manage, and scale your online business with a powerful multi-tenant platform built for modern sellers.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link to="/register?role=vendor"
//               className="px-8 py-4 rounded-2xl bg-white text-indigo-700 font-bold shadow-xl hover:scale-105 transition-all">
//               Start Selling <ArrowRight size={18} className="inline ml-1" />
//             </Link>

//             <Link to="/stores"
//               className="px-8 py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur hover:bg-white/20 transition-all">
//               Browse Stores
//             </Link>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mt-16">
//             {['500+ Stores', '50K Products', '$2M Revenue'].map((s) => (
//               <div key={s} className="bg-white/10 backdrop-blur rounded-xl py-4">
//                 <p className="font-bold">{s.split(' ')[0]}</p>
//                 <p className="text-xs text-indigo-200">{s.split(' ')[1]}</p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="py-24 bg-gradient-to-b from-white to-gray-50">
//         <div className="max-w-6xl mx-auto px-6">

//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
//             <p className="text-gray-500">Powerful tools to build and grow your store</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {FEATURES.map(({ icon: Icon, title, desc }) => (
//               <div key={title}
//                 className="p-6 rounded-2xl bg-white/70 backdrop-blur border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all">

//                 <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
//                   <Icon className="text-indigo-600" size={22} />
//                 </div>

//                 <h3 className="font-bold text-lg mb-2">{title}</h3>
//                 <p className="text-sm text-gray-500">{desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* PRICING */}
//       <section className="py-24 bg-gray-50">
//         <div className="max-w-5xl mx-auto px-6">

//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold">Simple Pricing</h2>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {PLANS.map((plan) => (
//               <div key={plan.name}
//                 className={`rounded-3xl p-7 transition-all hover:scale-[1.02] ${
//                   plan.popular
//                     ? 'bg-indigo-600 text-white shadow-2xl'
//                     : 'bg-white border'
//                 }`}>

//                 {plan.popular && (
//                   <div className="mb-3 text-xs font-bold bg-white text-indigo-600 px-3 py-1 rounded-full inline-block">
//                     Most Popular
//                   </div>
//                 )}

//                 <h3 className="text-xl font-bold">{plan.name}</h3>
//                 <p className="text-4xl font-bold mt-2">{plan.price}</p>

//                 <ul className="mt-6 space-y-2">
//                   {plan.features.map(f => (
//                     <li key={f} className="flex gap-2 text-sm">
//                       <Check size={14} /> {f}
//                     </li>
//                   ))}
//                 </ul>

//                 <Link to="/register?role=vendor"
//                   className={`block mt-6 text-center py-3 rounded-xl font-bold ${
//                     plan.popular
//                       ? 'bg-white text-indigo-600'
//                       : 'bg-indigo-600 text-white'
//                   }`}>
//                   Get Started
//                 </Link>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-center text-white">
//         <h2 className="text-4xl font-bold mb-4">Start Your Store Today</h2>
//         <p className="mb-8 text-indigo-200">Join thousands of sellers growing online</p>

//         <Link to="/register"
//           className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all">
//           Get Started
//         </Link>
//       </section>

//     </div>
//   )
// }

// import { Link } from 'react-router-dom'
// import { Store, Zap, Shield, BarChart3, Package, Globe, ArrowRight, Check } from 'lucide-react'

// const FEATURES = [
//   { icon: Store, title: 'Multi-Tenant Stores', desc: 'Each vendor gets a full storefront with branding & domain.' },
//   { icon: Zap, title: 'Lightning Fast', desc: 'Blazing performance powered by modern architecture.' },
//   { icon: Shield, title: 'Secure Payments', desc: 'Stripe & Razorpay with secure webhooks.' },
//   { icon: BarChart3, title: 'Analytics', desc: 'Real-time dashboards & revenue tracking.' },
//   { icon: Package, title: 'Inventory', desc: 'Stock, variants, and alerts built-in.' },
//   { icon: Globe, title: 'Global Ready', desc: 'Multi-currency & international support.' },
// ]

// const PLANS = [
//   { name: 'Free', price: '$0', features: ['Basic storefront', 'Email support'] },
//   { name: 'Pro', price: '$29', features: ['Custom domain', 'Payments', 'Analytics'], popular: true },
//   { name: 'Scale', price: '$79', features: ['Advanced analytics', 'API access', 'Priority support'] },
// ]

// export default function LandingPage() {
//   return (
//     <div className="bg-white">

//       {/* HERO */}
//       <section className="relative overflow-hidden py-32 bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">

//         <div className="absolute inset-0 hero-glow" />
//         <div className="absolute inset-0 bg-grid opacity-20" />

//         <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

//           {/* LEFT */}
//           <div className="text-white">
//             <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
//               Build. Launch. Scale.
//               <span className="block text-gradient animate-gradient">
//                 Your eCommerce Empire
//               </span>
//             </h1>

//             <p className="text-lg text-indigo-200 mb-8 max-w-lg">
//               The ultimate SaaS platform to create, manage, and grow your online marketplace.
//             </p>

//             <div className="flex gap-4">
//               <Link to="/register?role=vendor" className="btn-primary">
//                 Start Free <ArrowRight size={18} className="inline ml-1" />
//               </Link>

//               <Link to="/stores" className="btn-secondary">
//                 Explore Stores
//               </Link>
//             </div>

//             {/* TRUST */}
//             <div className="flex gap-6 mt-10 text-sm text-indigo-300">
//               <span>✔ 500+ Stores</span>
//               <span>✔ 50K Products</span>
//               <span>✔ $2M+ Revenue</span>
//             </div>
//           </div>

//           {/* RIGHT (MOCK UI CARD) */}
//           <div className="relative">
//             <div className="card-soft p-6 shadow-glow-lg">
//               <div className="space-y-4">
//                 <div className="h-4 w-1/2 bg-gray-200 rounded" />
//                 <div className="grid grid-cols-3 gap-3">
//                   {[1,2,3,4,5,6].map(i => (
//                     <div key={i} className="h-24 bg-gray-100 rounded-xl" />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* LOGOS / SOCIAL PROOF */}
//       <section className="py-16 bg-white text-center">
//         <p className="text-gray-400 text-sm mb-6">Trusted by growing brands</p>
//         <div className="flex justify-center gap-10 opacity-60 text-gray-500">
//           <span>ShopCo</span>
//           <span>Brandify</span>
//           <span>Sellix</span>
//           <span>MarketPro</span>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="py-24 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-6 text-center mb-16">
//           <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
//           <p className="text-gray-500">Powerful tools to run your marketplace</p>
//         </div>

//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
//           {FEATURES.map(({ icon: Icon, title, desc }) => (
//             <div key={title} className="card hover-lift">
//               <Icon className="text-indigo-600 mb-3" size={24} />
//               <h3 className="font-bold mb-2">{title}</h3>
//               <p className="text-sm text-gray-500">{desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* SHOWCASE */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

//           <div>
//             <h2 className="text-4xl font-bold mb-4">
//               Beautiful Storefronts Out of the Box
//             </h2>
//             <p className="text-gray-500 mb-6">
//               Launch stunning stores with zero design effort. Everything is optimized for conversion.
//             </p>

//             <ul className="space-y-3">
//               {['Mobile optimized', 'Fast checkout', 'SEO ready'].map(item => (
//                 <li key={item} className="flex gap-2">
//                   <Check size={16} className="text-indigo-600" /> {item}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="card-soft p-6 shadow-glow">
//             <div className="h-64 bg-gray-100 rounded-xl" />
//           </div>

//         </div>
//       </section>

//       {/* PRICING */}
//       <section className="py-24 bg-gray-50">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold">Simple Pricing</h2>
//         </div>

//         <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-6">
//           {PLANS.map(plan => (
//             <div key={plan.name}
//               className={`card-soft p-6 text-center ${
//                 plan.popular ? 'shadow-glow-lg scale-105' : ''
//               }`}>

//               <h3 className="font-bold text-lg">{plan.name}</h3>
//               <p className="text-3xl font-bold my-4">{plan.price}</p>

//               <ul className="space-y-2 mb-6 text-sm">
//                 {plan.features.map(f => <li key={f}>✔ {f}</li>)}
//               </ul>

//               <Link to="/register" className="btn-primary w-full">
//                 Get Started
//               </Link>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-24 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//         <h2 className="text-4xl font-bold mb-4">Start Selling Today</h2>
//         <p className="mb-8 text-indigo-200">Join the next generation of online sellers</p>

//         <Link to="/register" className="btn-primary bg-white text-indigo-600">
//           Create Store <ArrowRight size={18} className="inline ml-1" />
//         </Link>
//       </section>

//     </div>
//   )
// }

import { Link } from 'react-router-dom'
import {
  Store, Zap, Shield, BarChart3,
  Package, Globe, ArrowRight, Check
} from 'lucide-react'

const FEATURES = [
  { icon: Store, title: 'Multi-Tenant Stores', desc: 'Every vendor gets their own branded storefront.' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Built with Vite + React for blazing performance.' },
  { icon: Shield, title: 'Secure Payments', desc: 'Stripe & Razorpay with verified webhooks.' },
  { icon: BarChart3, title: 'Analytics', desc: 'Track revenue, orders, and growth insights.' },
  { icon: Package, title: 'Inventory', desc: 'Manage stock, variants, and alerts easily.' },
  { icon: Globe, title: 'Global Ready', desc: 'Multi-currency & worldwide selling support.' },
]

const PLANS = [
  { name: 'Free', price: '$0', features: ['10 Products', 'Basic Store', 'Email Support'] },
  { name: 'Basic', price: '$29', features: ['100 Products', 'Custom Domain', 'Analytics'], popular: true },
  { name: 'Pro', price: '$79', features: ['Unlimited Products', 'API Access', 'Priority Support'] },
]

export default function LandingPage() {
  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden py-28 bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 text-white">

        {/* Glow effects */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[100px] rounded-full" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
            <Zap size={14} />
            <span className="text-sm">All-in-one SaaS eCommerce</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Build Your Store
            <span className="block bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Without Limits
            </span>
          </h1>

          <p className="text-lg text-indigo-200 max-w-2xl mx-auto mb-10">
            Launch, manage, and scale your online business with a powerful multi-vendor SaaS platform.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/register?role=vendor" className="btn-primary text-base px-8 py-3">
              Start Selling <ArrowRight size={18} />
            </Link>

            <Link to="/stores" className="btn-secondary text-base px-8 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20">
              Browse Stores
            </Link>
          </div>

          {/* Floating card */}
          <div className="mt-20 relative">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 max-w-3xl mx-auto shadow-2xl">
              <p className="text-sm text-indigo-200 mb-2">Live Preview</p>
              <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything you need</h2>
          <p className="text-gray-500">Powerful tools to run your business</p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                <Icon className="text-indigo-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Simple pricing</h2>
        </div>

        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div key={plan.name}
              className={`rounded-3xl p-8 border ${
                plan.popular
                  ? 'bg-indigo-600 text-white scale-105 shadow-2xl'
                  : 'bg-white'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={16} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/register?role=vendor"
                className={`block text-center py-3 rounded-xl font-semibold ${
                  plan.popular
                    ? 'bg-white text-indigo-600'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-700 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">
          Start your journey today
        </h2>
        <p className="mb-8 text-indigo-200">
          Join thousands of sellers growing their business
        </p>

        <Link to="/register"
          className="inline-flex items-center gap-2 bg-white text-indigo-700 px-10 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition">
          Get Started <ArrowRight size={18} />
        </Link>
      </section>

    </div>
  )
}
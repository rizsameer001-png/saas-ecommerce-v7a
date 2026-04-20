import { useEffect, useState } from 'react'
import { useParams, useOutletContext, Link } from 'react-router-dom'
import { productsApi } from '../../api/services'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'
import { ShoppingCart, Star, Minus, Plus, ChevronLeft, Play, Package, Tag, ChevronRight, Youtube, X } from 'lucide-react'
import { RatingStars } from '../../components/ui/index'
import { useNavigate } from 'react-router-dom'

// ─── YouTube embed modal ──────────────────────────────────────────────────────
function VideoModal({video, onClose}){
  if(!video)return null
  const src=video.type==='youtube'&&video.youtubeId
    ?`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`
    :video.url
  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={onClose}>
      <div className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden" onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80">
          <X size={16}/>
        </button>
        {video.type==='youtube'||video.youtubeId?(
          <iframe src={src} title={video.title||'Product video'} className="w-full h-full" allowFullScreen allow="autoplay"/>
        ):(
          <video src={video.url} controls autoPlay className="w-full h-full"/>
        )}
      </div>
    </div>
  )
}

// ─── Attribute display ────────────────────────────────────────────────────────
function AttributeSection({attrs}){
  if(!attrs)return null
  const rows=[]
  const addRow=(label,value)=>{
    if(!value)return
    const display=Array.isArray(value)?value.join(', '):value
    if(display&&display.trim())rows.push({label,display})
  }
  addRow('Size',attrs.size)
  addRow('Color',attrs.color)
  addRow('Material',attrs.material)
  addRow('Storage',attrs.storage)
  addRow('RAM',attrs.ram)
  addRow('Weight',attrs.weight)
  if(attrs.bookFormat)addRow('Format',attrs.bookFormat.charAt(0).toUpperCase()+attrs.bookFormat.slice(1))
  if(attrs.packageContents)addRow('Package Contents',attrs.packageContents)
  if(attrs.custom?.length)attrs.custom.filter(c=>c.key&&c.value).forEach(c=>addRow(c.key,c.value))

  if(rows.length===0)return null
  return(
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
        <p className="font-semibold text-gray-700 text-sm flex items-center gap-2"><Tag size={14}/> Product Details</p>
      </div>
      <div className="divide-y divide-gray-50">
        {rows.map(({label,display},i)=>(
          <div key={i} className="flex px-4 py-2.5 text-sm">
            <span className="w-36 text-gray-500 font-medium flex-shrink-0">{label}</span>
            <span className="text-gray-800">{display}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProductDetailPage(){
  const{idOrSlug}=useParams()
  const{store,storeSlug,primaryColor}=useOutletContext()
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[product,setProduct]=useState(null)
  const[loading,setLoading]=useState(true)
  const[qty,setQty]=useState(1)
  const[selectedVariant,setSelectedVariant]=useState(null)
  const[activeImg,setActiveImg]=useState(0)
  const[adding,setAdding]=useState(false)
  const[activeVideo,setActiveVideo]=useState(null)
  const currency=store?.settings?.currencySymbol||'$'

  useEffect(()=>{
    productsApi.getOne(storeSlug,idOrSlug)
      .then(r=>{setProduct(r.data.data);setActiveImg(0)})
      .catch(()=>navigate(`/store/${storeSlug}/products`))
      .finally(()=>setLoading(false))
  },[idOrSlug,storeSlug])

  const handleAddToCart=async()=>{
    if(!product)return
    setAdding(true)
    await dispatch(addToCart({storeSlug,productId:product._id,quantity:qty,variantId:selectedVariant?._id}))
    setTimeout(()=>setAdding(false),1200)
  }

  if(loading)return(
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="skeleton aspect-square rounded-2xl"/>
      <div className="space-y-4">{Array(6).fill(0).map((_,i)=><div key={i} className="skeleton h-6 rounded-lg"/>)}</div>
    </div>
  )
  if(!product)return null

  const price=selectedVariant?selectedVariant.price:product.price
  const comparePrice=selectedVariant?null:product.comparePrice
  const images=product.images||[]
  const videos=product.videos||[]
  const allMedia=[...images.map(i=>({...i,mediaType:'image'})),...videos.map(v=>({...v,mediaType:'video'}))]
  const breadcrumb=product.category?.path||[]

  return(
    <div>
      <VideoModal video={activeVideo} onClose={()=>setActiveVideo(null)}/>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6 flex-wrap">
        <button onClick={()=>navigate(-1)} className="flex items-center gap-1 hover:text-gray-700 transition-colors">
          <ChevronLeft size={14}/> Back
        </button>
        {breadcrumb.length>0&&(
          <>
            <span>/</span>
            {breadcrumb.map((crumb,i)=>(
              <span key={i} className="flex items-center gap-1">
                {i<breadcrumb.length-1?<span className="hover:text-gray-700 cursor-pointer">{crumb}</span>:<span className="text-gray-700 font-medium">{crumb}</span>}
                {i<breadcrumb.length-1&&<ChevronRight size={12}/>}
              </span>
            ))}
          </>
        )}
        {product.category&&breadcrumb.length===0&&(
          <><span>/</span><span className="text-gray-700 font-medium">{product.category.name}</span></>
        )}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: media */}
        <div className="space-y-3">
          {/* Main image / video */}
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
            {images[activeImg]?.url?(
              <img src={images[activeImg].url} alt={product.name} className="w-full h-full object-cover"/>
            ):(
              <div className="w-full h-full flex items-center justify-center text-gray-300"><ShoppingCart size={48}/></div>
            )}
            {/* Labels on main image */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.labels?.isNewArrival&&<span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">✨ New Arrival</span>}
              {product.labels?.isOnSale&&product.discountPercent>0&&<span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">🔥 -{product.discountPercent}% OFF</span>}
              {product.labels?.isFeatured&&<span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">⭐ Featured</span>}
            </div>
          </div>

          {/* Thumbnail strip: images + video thumbnails */}
          {(images.length>1||videos.length>0)&&(
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img,i)=>(
                <button key={i} onClick={()=>setActiveImg(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${i===activeImg?'border-indigo-500':'border-gray-200 hover:border-gray-300'}`}>
                  <img src={img.url} alt="" className="w-full h-full object-cover"/>
                </button>
              ))}
              {videos.map((v,i)=>(
                <button key={`v${i}`} onClick={()=>setActiveVideo(v)}
                  className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-gray-200 hover:border-red-400 relative group transition-all">
                  {v.thumbnail?(
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover"/>
                  ):(
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center"><Play size={16} className="text-gray-400"/></div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                      <Play size={10} className="text-white ml-0.5"/>
                    </div>
                  </div>
                  {v.type==='youtube'&&<Youtube size={10} className="absolute top-1 right-1 text-red-400"/>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: info */}
        <div className="space-y-5">
          {product.category&&(
            <p className="text-sm font-semibold uppercase tracking-wider" style={{color:primaryColor}}>
              {product.category.name}
            </p>
          )}
          <h1 className="font-display text-3xl font-bold text-gray-900">{product.name}</h1>

          {product.stats?.reviewCount>0&&(
            <div className="flex items-center gap-2">
              <RatingStars rating={product.stats.rating} size={16}/>
              <span className="text-sm text-gray-500">({product.stats.reviewCount} reviews)</span>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-500">{product.stats.views} views</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-gray-900">{currency}{price?.toFixed(2)}</span>
            {comparePrice>price&&(
              <>
                <span className="text-xl text-gray-400 line-through">{currency}{comparePrice.toFixed(2)}</span>
                <span className="badge bg-red-100 text-red-700 text-sm">{Math.round(((comparePrice-price)/comparePrice)*100)}% OFF</span>
              </>
            )}
          </div>

          {product.shortDescription&&<p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>}

          {/* Variants */}
          {product.hasVariants&&product.variants?.length>0&&(
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Select Option</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(v=>(
                  <button key={v._id} onClick={()=>setSelectedVariant(v._id===selectedVariant?._id?null:v)}
                    disabled={v.inventory===0&&product.trackInventory}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                      selectedVariant?._id===v._id?'border-indigo-500 bg-indigo-50 text-indigo-700':'border-gray-200 text-gray-700 hover:border-gray-300'
                    } disabled:opacity-40 disabled:cursor-not-allowed`}>
                    {v.name}
                    {v.inventory===0&&product.trackInventory&&<span className="ml-1 text-xs text-gray-400">(Out)</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock status */}
          <div className="flex items-center gap-2 text-sm">
            {product.inStock?(
              <><span className="w-2 h-2 bg-green-500 rounded-full"/><span className="text-green-700 font-medium">In Stock</span>{product.trackInventory&&!product.hasVariants&&<span className="text-gray-400">· {product.inventory} left</span>}</>
            ):(
              <><span className="w-2 h-2 bg-red-500 rounded-full"/><span className="text-red-600 font-medium">Out of Stock</span></>
            )}
          </div>

          {/* Qty + Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={()=>setQty(Math.max(1,qty-1))} className="px-3 py-3 hover:bg-gray-50 transition-colors"><Minus size={14}/></button>
              <span className="px-4 py-3 font-bold text-gray-800 min-w-[40px] text-center">{qty}</span>
              <button onClick={()=>setQty(qty+1)} className="px-3 py-3 hover:bg-gray-50 transition-colors"><Plus size={14}/></button>
            </div>
            <button onClick={handleAddToCart}
              disabled={adding||(!product.inStock&&product.trackInventory)||(!selectedVariant&&product.hasVariants)}
              className="flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-xl font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              style={{backgroundColor:primaryColor}}>
              <ShoppingCart size={18}/>
              {adding?'Added! ✓':(!product.inStock&&product.trackInventory)?'Out of Stock':product.hasVariants&&!selectedVariant?'Select Option':'Add to Cart'}
            </button>
          </div>

          {/* Description */}
          {product.description&&(
            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>
          )}

          {/* Attributes */}
          <AttributeSection attrs={product.attributes}/>

          {/* Package contents */}
          {product.attributes?.packageContents&&(
            <div className="flex items-start gap-2 bg-gray-50 rounded-xl p-3 text-sm text-gray-600">
              <Package size={14} className="text-gray-400 mt-0.5 flex-shrink-0"/>
              <span>{product.attributes.packageContents}</span>
            </div>
          )}
        </div>
      </div>

      {/* Videos section below */}
      {videos.length>0&&(
        <div className="mt-12">
          <h3 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Play size={18} className="text-red-500"/> Product Videos
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {videos.map((v,i)=>(
              <button key={i} onClick={()=>setActiveVideo(v)}
                className="group relative aspect-video bg-gray-100 rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-indigo-300 transition-all">
                {v.thumbnail?(
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                ):(
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <Play size={24} className="text-gray-400"/>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={18} className="text-white ml-1"/>
                  </div>
                </div>
                {v.type==='youtube'&&(
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Youtube size={9}/> YouTube
                  </div>
                )}
                {v.title&&<p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 text-white text-xs font-medium px-2 py-1.5 truncate">{v.title}</p>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

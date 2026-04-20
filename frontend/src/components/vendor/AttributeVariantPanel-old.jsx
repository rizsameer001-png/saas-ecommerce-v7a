import { useState, useEffect, useCallback, useRef } from 'react'
import { attributesApi } from '../../api/services'
import {
  Plus, X, Zap, ChevronDown, ChevronUp,
  Palette, Image, List, CheckSquare, Type, Hash,
  Check, Trash2, RefreshCw, Layers
} from 'lucide-react'
import { Button, Spinner, Input } from '../../components/ui/index'
import toast from 'react-hot-toast'

const TYPE_ICONS = {
  dropdown:     List,
  checkbox:     CheckSquare,
  color_swatch: Palette,
  image_swatch: Image,
  text:         Type,
  number:       Hash,
}

// ─── Value Picker for single attribute ────────────────────────────────────────
function AttrValuePicker({ attr, selectedIds, onToggle }) {
  const Icon = TYPE_ICONS[attr.type] || List
  const allSelected = attr.values.length > 0 && selectedIds.length === attr.values.length

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border-b border-gray-100">
        <Icon size={13} className="text-gray-500 flex-shrink-0" />
        <span className="font-semibold text-sm text-gray-700 flex-1">{attr.name}</span>
        <span className="text-xs text-gray-400">({selectedIds.length}/{attr.values.length})</span>
        {attr.usedForVariants && (
          <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">VARIANTS</span>
        )}
        {attr.filterable && (
          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">FILTER</span>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center gap-3 mb-2">
          <button
            type="button"
            onClick={() => {
              if (allSelected) {
                attr.values.forEach(v => { if (selectedIds.includes(v._id)) onToggle(attr._id, v._id) })
              } else {
                attr.values.forEach(v => { if (!selectedIds.includes(v._id)) onToggle(attr._id, v._id) })
              }
            }}
            className="text-xs text-indigo-600 font-semibold hover:underline"
          >
            {allSelected ? '✕ Deselect all' : '✓ Select all'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {attr.values.map(v => {
            const sel = selectedIds.includes(v._id)
            return (
              <button
                key={v._id}
                type="button"
                onClick={() => onToggle(attr._id, v._id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${
                  sel
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                {attr.type === 'color_swatch' && (
                  <span
                    className="w-3 h-3 rounded-full border border-white/40 flex-shrink-0"
                    style={{ backgroundColor: v.colorHex || '#ccc' }}
                  />
                )}
                {attr.type === 'image_swatch' && v.imageUrl && (
                  <img src={v.imageUrl} alt="" className="w-4 h-4 rounded object-cover flex-shrink-0" />
                )}
                {v.label}
                {sel && <Check size={10} />}
              </button>
            )
          })}
          {attr.values.length === 0 && (
            <p className="text-xs text-gray-400 italic">No values — add them in Attributes manager</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Variant row ──────────────────────────────────────────────────────────────
function VariantRow({ variant, index, currency, onChange, onRemove }) {
  return (
    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {(variant.options || []).map((opt, i) => (
            <span key={i} className="flex items-center gap-1">
              {opt.colorHex && (
                <span className="w-3 h-3 rounded-full border border-gray-200 flex-shrink-0"
                  style={{ backgroundColor: opt.colorHex }} />
              )}
              {opt.imageUrl && (
                <img src={opt.imageUrl} alt="" className="w-4 h-4 rounded object-cover flex-shrink-0" />
              )}
              <span className="text-xs font-medium text-gray-700">{opt.value}</span>
              {i < variant.options.length - 1 && <span className="text-gray-300 text-xs">/</span>}
            </span>
          ))}
          {variant._temp && (
            <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">NEW</span>
          )}
        </div>
      </td>
      <td className="px-2 py-2">
        <input type="text" value={variant.sku || ''} onChange={e => onChange(index, 'sku', e.target.value)}
          placeholder="SKU" className="input text-xs py-1.5 w-24" />
      </td>
      <td className="px-2 py-2">
        <div className="relative">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">{currency}</span>
          <input type="number" step="0.01" min="0" value={variant.price || ''}
            onChange={e => onChange(index, 'price', parseFloat(e.target.value) || 0)}
            className="input text-xs py-1.5 pl-6 w-24" />
        </div>
      </td>
      <td className="px-2 py-2">
        <input type="number" min="0" value={variant.inventory ?? 0}
          onChange={e => onChange(index, 'inventory', parseInt(e.target.value) || 0)}
          className="input text-xs py-1.5 w-20" />
      </td>
      <td className="px-2 py-2">
        <input type="url" value={variant.image || ''}
          onChange={e => onChange(index, 'image', e.target.value)}
          placeholder="Image URL" className="input text-xs py-1.5 w-32" />
      </td>
      <td className="px-2 py-2 text-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={variant.isActive !== false}
            onChange={e => onChange(index, 'isActive', e.target.checked)} className="sr-only peer" />
          <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4" />
        </label>
      </td>
      <td className="px-2 py-2 text-center">
        <button type="button" onClick={() => onRemove(index)}
          className="p-1 text-red-400 hover:text-red-600 transition-colors">
          <Trash2 size={12} />
        </button>
      </td>
    </tr>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AttributeVariantPanel({
  storeSlug, price, currency,
  variants, onVariantsChange,
  productAttributes, onAttributesChange
}) {
  const [allAttrs, setAllAttrs]     = useState([])
  const [loading, setLoading]       = useState(false)
  const [generating, setGenerating] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Which store attributes are applied to this product
  const [selectedAttrIds, setSelectedAttrIds] = useState(() =>
    (productAttributes || []).map(a => a.attributeId?._id || a.attributeId).filter(Boolean)
  )

  // Per-attribute selected value IDs
  const [selectedValues, setSelectedValues] = useState(() => {
    const map = {}
    ;(productAttributes || []).forEach(a => {
      const id = a.attributeId?._id || a.attributeId
      if (id) map[id] = (a.selectedValues || []).map(v => v.valueId || v._id).filter(Boolean)
    })
    return map
  })

  const [variantRows, setVariantRows] = useState(variants || [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Fetch all store attributes
  useEffect(() => {
    if (!storeSlug) return
    setLoading(true)
    attributesApi.getAll(storeSlug)
      .then(r => setAllAttrs(r.data.data || []))
      .catch(() => toast.error('Failed to load attributes'))
      .finally(() => setLoading(false))
  }, [storeSlug])

  // Bubble variants up
  useEffect(() => { onVariantsChange(variantRows) }, [variantRows])

  // Bubble productAttributes up
  useEffect(() => {
    const mapped = selectedAttrIds.map(id => {
      const attr = allAttrs.find(a => a._id === id)
      if (!attr) return null
      const selVals = (selectedValues[id] || []).map(vid => {
        const val = attr.values.find(v => v._id === vid)
        return val ? { valueId: val._id, label: val.label, value: val.value, colorHex: val.colorHex, imageUrl: val.imageUrl } : null
      }).filter(Boolean)
      return {
        attributeId:     id,
        attributeName:   attr.name,
        attributeType:   attr.type,
        selectedValues:  selVals,
        usedForVariants: attr.usedForVariants,
        filterable:      attr.filterable,
        required:        attr.required,
      }
    }).filter(Boolean)
    onAttributesChange(mapped)
  }, [selectedAttrIds, selectedValues, allAttrs])

  const toggleAttr = (attrId) => {
    if (selectedAttrIds.includes(attrId)) {
      setSelectedAttrIds(p => p.filter(id => id !== attrId))
      setSelectedValues(p => { const n = { ...p }; delete n[attrId]; return n })
    } else {
      setSelectedAttrIds(p => [...p, attrId])
      // Auto-select all values for convenience
      const attr = allAttrs.find(a => a._id === attrId)
      if (attr?.values?.length) {
        setSelectedValues(p => ({ ...p, [attrId]: attr.values.map(v => v._id) }))
      }
    }
  }

  const toggleValue = (attrId, valueId) => {
    setSelectedValues(p => {
      const cur = p[attrId] || []
      return { ...p, [attrId]: cur.includes(valueId) ? cur.filter(v => v !== valueId) : [...cur, valueId] }
    })
  }

  const handleGenerate = async () => {
    const variantAttrIds = selectedAttrIds.filter(id =>
      allAttrs.find(a => a._id === id)?.usedForVariants
    )
    if (!variantAttrIds.length) {
      return toast.error('Select at least one attribute marked "Used for Variants"')
    }

    // Ensure values are selected for each variant attribute
    const missingValues = variantAttrIds.filter(id => !(selectedValues[id]?.length))
    if (missingValues.length) {
      return toast.error('Please select at least one value for each variant attribute')
    }

    setGenerating(true)
    try {
      const { data } = await attributesApi.generateVariants(storeSlug, {
        attributeIds:    variantAttrIds,
        selectedValues:  selectedValues,
        existingVariants: variantRows,
        priceBase:       price || 0,
      })
      setVariantRows(data.data || [])
      toast.success(`${data.data?.length || 0} variant combinations generated`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to generate variants')
    } finally { setGenerating(false) }
  }

  const updateVariant = (index, key, val) => {
    setVariantRows(p => p.map((v, i) => i === index ? { ...v, [key]: val } : v))
  }

  const removeVariant = (index) => {
    setVariantRows(p => p.filter((_, i) => i !== index))
  }

  const selectedAttrs    = allAttrs.filter(a => selectedAttrIds.includes(a._id))
  const variantCapable   = selectedAttrs.filter(a => a.usedForVariants)

  if (loading) return (
    <div className="flex items-center gap-2 text-sm text-gray-400 py-4">
      <Spinner size="sm" /> Loading attributes…
    </div>
  )

  return (
    <div className="space-y-5">

      {/* ── Attribute selector dropdown ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="label mb-0">Apply Store Attributes</label>
          <a href="/dashboard/attributes" target="_blank" rel="noreferrer"
            className="text-xs text-indigo-600 hover:underline font-medium">
            + Manage Attributes
          </a>
        </div>

        {allAttrs.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center bg-gray-50">
            <Layers size={28} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-600 mb-1">No attributes yet</p>
            <p className="text-xs text-gray-400 mb-3">Create reusable attributes (Size, Color…) first</p>
            <a href="/dashboard/attributes" target="_blank" rel="noreferrer"
              className="btn-primary text-sm inline-flex items-center gap-1.5 px-4 py-2">
              <Plus size={13} /> Create Attributes
            </a>
          </div>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(o => !o)}
              className="w-full input text-left flex items-center justify-between cursor-pointer"
            >
              <span className="text-sm text-gray-700">
                {selectedAttrIds.length === 0
                  ? 'Select attributes to apply to this product…'
                  : `${selectedAttrIds.length} attribute${selectedAttrIds.length !== 1 ? 's' : ''} selected`
                }
              </span>
              {dropdownOpen
                ? <ChevronUp size={15} className="text-gray-400 flex-shrink-0" />
                : <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />
              }
            </button>

            {dropdownOpen && (
              <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto">
                {allAttrs.map(attr => {
                  const Icon    = TYPE_ICONS[attr.type] || List
                  const selected = selectedAttrIds.includes(attr._id)
                  return (
                    <button
                      key={attr._id}
                      type="button"
                      onClick={() => toggleAttr(attr._id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        selected ? 'bg-indigo-50 border-l-2 border-indigo-500' : 'hover:bg-gray-50 border-l-2 border-transparent'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        selected ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'
                      }`}>
                        {selected && <Check size={11} className="text-white" />}
                      </div>
                      <Icon size={14} className="text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800">{attr.name}</p>
                        <p className="text-xs text-gray-400">
                          {attr.values?.length || 0} values · {attr.type.replace(/_/g, ' ')}
                        </p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        {attr.usedForVariants && (
                          <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold">VAR</span>
                        )}
                        {attr.filterable && (
                          <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">FILTER</span>
                        )}
                        {attr.required && (
                          <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">REQ</span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Selected attribute chips */}
        {selectedAttrs.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedAttrs.map(attr => (
              <span key={attr._id}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1.5 rounded-full">
                {attr.name}
                <button type="button" onClick={() => toggleAttr(attr._id)}
                  className="text-indigo-400 hover:text-indigo-700 ml-0.5">
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Value pickers ── */}
      {selectedAttrs.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">
            Select values for each attribute:
          </p>
          {selectedAttrs.map(attr => (
            <AttrValuePicker
              key={attr._id}
              attr={attr}
              selectedIds={selectedValues[attr._id] || []}
              onToggle={toggleValue}
            />
          ))}
        </div>
      )}

      {/* ── Variant Generator ── */}
      {variantCapable.length > 0 && (
        <div className="border-2 border-purple-100 rounded-2xl overflow-hidden">
          <div className="flex items-start justify-between px-5 py-4 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div>
              <h3 className="font-display font-bold text-purple-900 flex items-center gap-2">
                <Zap size={15} className="text-purple-600" />
                Auto-Generate Variants
              </h3>
              <p className="text-xs text-purple-600 mt-0.5">
                Creates all combinations of:{' '}
                <strong>{variantCapable.map(a => a.name).join(' × ')}</strong>
              </p>
              {variantRows.length > 0 && (
                <p className="text-xs text-purple-500 mt-1">
                  {variantRows.length} combination{variantRows.length !== 1 ? 's' : ''} currently
                </p>
              )}
            </div>
            <Button
              type="button"
              onClick={handleGenerate}
              loading={generating}
              className="bg-purple-600 hover:bg-purple-700 text-white border-0 text-sm px-4 py-2 flex-shrink-0 ml-4"
            >
              <Zap size={13} />
              {variantRows.length > 0 ? 'Regenerate' : 'Generate'}
            </Button>
          </div>

          {variantRows.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Combination</th>
                    <th className="px-2 py-2.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">SKU</th>
                    <th className="px-2 py-2.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Price</th>
                    <th className="px-2 py-2.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Stock</th>
                    <th className="px-2 py-2.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Image</th>
                    <th className="px-2 py-2.5 text-center text-xs font-bold text-gray-500 uppercase tracking-wide">Active</th>
                    <th className="px-2 py-2.5 w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {variantRows.map((v, i) => (
                    <VariantRow
                      key={i} variant={v} index={i} currency={currency}
                      onChange={updateVariant} onRemove={removeVariant}
                    />
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {variantRows.length} variant{variantRows.length !== 1 ? 's' : ''} total ·{' '}
                  {variantRows.filter(v => v.isActive !== false).length} active
                </span>
                <button type="button" onClick={() => setVariantRows([])}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors">
                  Clear all
                </button>
              </div>
            </div>
          ) : (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-gray-400">
                Select values above then click <strong>"Generate"</strong>
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Info for non-variant attributes ── */}
      {selectedAttrs.length > 0 && variantCapable.length === 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
          <strong>ℹ️ Info:</strong> None of the selected attributes are marked "Used for Variants".
          These attributes will appear in the product detail page but won't create variants.
          To enable variant generation, go to{' '}
          <a href="/dashboard/attributes" target="_blank" className="underline font-semibold">
            Attributes Manager
          </a>{' '}
          and enable "Used for Variants" on the relevant attribute.
        </div>
      )}
    </div>
  )
}

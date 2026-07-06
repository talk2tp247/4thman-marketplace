'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Star, Heart, Search, Filter } from 'lucide-react'

interface Product {
  id: string
  title: string
  description: string
  price: number
  rating: number
  reviewCount: number
  category: string
  image: string
  seller: { name: string; storeName?: string }
}

const categories = [
  'All',
  'eBooks',
  'Software',
  'Online Courses',
  'Physical Products',
  'Music & Audio',
  'Templates',
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        if (res.ok) {
          const data = await res.json()
          setProducts(data)
          setFilteredProducts(data)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, searchTerm, products])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Browse Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover amazing products from sellers worldwide</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-blue dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-gray-700 dark:text-gray-300" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">Categories</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-blue text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No products found</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group cursor-pointer h-full">
                  <div className="relative h-48 bg-gradient-to-br from-blue-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                    <span className="text-5xl group-hover:scale-110 transition-transform">{product.image}</span>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800">
                      <Heart size={16} className="text-gray-400" />
                    </button>
                  </div>
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-brand-blue font-medium uppercase tracking-wide">{product.category}</p>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <Star size={14} className="fill-brand-gold text-brand-gold" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{product.rating.toFixed(1)}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                      <button className="text-sm font-medium text-brand-blue hover:text-blue-700">Add</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

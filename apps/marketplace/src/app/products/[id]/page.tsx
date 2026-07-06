'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Star, Heart, Share2, ShoppingCart, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: string
  title: string
  description: string
  price: number
  comparePrice?: number
  category: string
  image: string
  rating: number
  reviewCount: number
  seller: { id: string; name: string; storeName?: string }
  reviews: Array<{ id: string; rating: number; text: string; user: { name: string } }>
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`)
        if (res.ok) {
          setProduct(await res.json())
        }
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) fetchProduct()
  }, [params.id])

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/auth/login'
      return
    }

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: params.id, quantity }),
      })

      if (res.ok) {
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>

  const discount = product.comparePrice ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8 text-gray-600 dark:text-gray-400">
          <Link href="/products" className="hover:text-brand-blue">Products</Link>
          <ChevronRight size={16} />
          <Link href={`/products?category=${product.category}`} className="hover:text-brand-blue">{product.category}</Link>
          <ChevronRight size={16} />
          <span className="text-gray-900 dark:text-white">{product.title}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 flex items-center justify-center">
            <div className="text-center">
              <span className="text-8xl">{product.image}</span>
              {discount > 0 && (
                <div className="mt-6 inline-block bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-2 rounded-lg font-semibold">
                  Save {discount}%
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Rating */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? 'fill-brand-gold text-brand-gold' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{product.rating.toFixed(1)}</span>
                <span className="text-gray-500 dark:text-gray-400">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                {product.comparePrice && (
                  <span className="text-xl text-gray-500 dark:text-gray-400 line-through">${product.comparePrice}</span>
                )}
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sold by</p>
              <Link href={`/seller/${product.seller.id}`} className="text-lg font-semibold text-brand-blue hover:underline">
                {product.seller.storeName || product.seller.name}
              </Link>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold text-gray-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`btn-primary w-full flex items-center justify-center gap-2 transition-all ${
                  addedToCart ? 'bg-green-600 hover:bg-green-700' : ''
                }`}
              >
                <ShoppingCart size={20} />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>

              <button className="btn-gold w-full flex items-center justify-center gap-2">
                <Heart size={20} />
                Save for Later
              </button>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-brand-blue font-medium hover:underline">
              <Share2 size={18} />
              Share this product
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-gray-900 dark:text-white">{review.user.name}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? 'fill-brand-gold text-brand-gold' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

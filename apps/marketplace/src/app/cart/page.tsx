'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trash2, ArrowLeft, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: string
  quantity: number
  product: { id: string; title: string; price: number; image: string }
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
      return
    }

    const fetchCart = async () => {
      try {
        const res = await fetch('/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          setCartItems(await res.json())
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const tax = total * 0.1
  const shipping = total > 100 ? 0 : 10
  const finalTotal = total + tax + shipping

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading cart...</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/products" className="flex items-center gap-2 text-brand-blue font-medium mb-8 hover:underline">
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">Your cart is empty</p>
            <Link href="/products" className="btn-primary inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">{item.product.image}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.product.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Qty: {item.quantity}</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-fit sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white mb-6">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <Lock size={18} />
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

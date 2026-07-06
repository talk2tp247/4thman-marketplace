'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, Package, ShoppingCart, DollarSign, Users, TrendingUp, LogOut } from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  accountType: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/auth/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.accountType !== 'seller') {
      router.push('/products')
      return
    }

    setUser(parsedUser)
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!user) return null

  const stats = [
    { icon: Package, label: 'Total Products', value: '12', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
    { icon: ShoppingCart, label: 'Total Orders', value: '45', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
    { icon: DollarSign, label: 'Revenue', value: '$2,450', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
    { icon: Users, label: 'Customers', value: '38', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Seller Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Welcome back, {user.name}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  <TrendingUp className="text-green-600" size={18} />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Products</h2>
                <Link href="/dashboard/products/new" className="btn-primary py-2 px-4">
                  Add Product
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Product</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Sales</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((i) => (
                      <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-4 px-4 text-gray-900 dark:text-white">Product {i}</td>
                        <td className="py-4 px-4 text-gray-900 dark:text-white">${(i * 25).toFixed(2)}</td>
                        <td className="py-4 px-4 text-gray-900 dark:text-white">{i * 3}</td>
                        <td className="py-4 px-4">
                          <button className="text-brand-blue hover:underline text-sm font-medium">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/dashboard/products/new" className="block w-full btn-primary text-center py-3">
                  Create New Product
                </Link>
                <button className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                  View Analytics
                </button>
                <button className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                  View Orders
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-blue to-blue-700 rounded-xl p-6 text-white shadow-md">
              <h3 className="text-lg font-bold mb-2">Earnings This Month</h3>
              <p className="text-3xl font-bold mb-4">$2,450</p>
              <button className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-all">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

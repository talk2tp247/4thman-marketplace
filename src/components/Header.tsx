'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, LogOut, LogIn, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  accountType: string
}

export default function Header() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">4M</span>
            </div>
            4thMan
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-gray-700 dark:text-gray-300 hover:text-brand-blue font-medium">
              Shop
            </Link>
            <Link href="/auth/register?type=seller" className="text-gray-700 dark:text-gray-300 hover:text-brand-blue font-medium">
              Sell
            </Link>
            <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-brand-blue font-medium">
              Help
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            {user && (
              <Link
                href="/cart"
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <ShoppingCart size={24} />
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
            )}

            {/* Auth Buttons */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href={user.accountType === 'seller' ? '/dashboard' : '/profile'}
                  className="px-4 py-2 text-brand-blue font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                >
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/auth/login" className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium">
                  <LogIn size={18} />
                  Sign In
                </Link>
                <Link href="/auth/register" className="btn-primary py-2 px-4 flex items-center gap-2">
                  <UserPlus size={18} />
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
            <Link href="/products" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Shop
            </Link>
            <Link href="/auth/register?type=seller" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Sell
            </Link>
            <Link href="#" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Help
            </Link>
            {user && (
              <>
                <Link href={user.accountType === 'seller' ? '/dashboard' : '/profile'} className="block px-4 py-2 text-brand-blue font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

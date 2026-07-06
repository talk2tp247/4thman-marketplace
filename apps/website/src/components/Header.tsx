'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">4M</span>
            </div>
            4thMan
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-brand-blue font-medium">Features</a>
            <a href="#sellers" className="text-gray-700 hover:text-brand-blue font-medium">For Sellers</a>
            <a href="#testimonials" className="text-gray-700 hover:text-brand-blue font-medium">Reviews</a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <a href="http://localhost:3000/auth/login" className="hidden md:block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">Sign In</a>
            <a href="http://localhost:3000/auth/register" className="hidden md:block btn-primary py-2 px-4">Get Started</a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200">
            <a href="#features" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Features</a>
            <a href="#sellers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">For Sellers</a>
            <a href="#testimonials" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Reviews</a>
            <a href="http://localhost:3000/auth/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Sign In</a>
            <a href="http://localhost:3000/auth/register" className="block btn-primary text-center py-2 px-4">Get Started</a>
          </div>
        )}
      </div>
    </header>
  )
}

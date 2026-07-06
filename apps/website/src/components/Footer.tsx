import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center"><span className="text-white font-bold text-sm">4M</span></div>
              <span className="text-xl font-bold text-white">4thMan</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">The global marketplace connecting buyers and sellers worldwide. Secure, fast, and built for everyone.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="http://localhost:3000/products" className="hover:text-brand-gold transition-colors">Browse Products</a></li>
              <li><a href="http://localhost:3000/products" className="hover:text-brand-gold transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Trending</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Deals & Offers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">For Sellers</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="http://localhost:3000/auth/register?type=seller" className="hover:text-brand-gold transition-colors">Start Selling</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Seller Guide</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Pricing & Fees</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Analytics</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} 4thMan. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500"><span>🌍 English (US)</span><span>💵 USD</span></div>
        </div>
      </div>
    </footer>
  )
}

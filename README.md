# 4thMan - Global Marketplace

A full-featured e-commerce marketplace platform for buying and selling physical and digital products globally.

## 🚀 Features

- **User Authentication** - Secure login/registration for buyers and sellers
- **Product Browsing** - Search, filter, and discover products by category
- **Shopping Cart** - Add products to cart and manage quantities
- **Seller Dashboard** - Manage products, track orders, and view analytics
- **Product Reviews** - Read and leave reviews for products
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Mode** - Built-in dark theme support
- **Real-time Data** - SQLite database with Prisma ORM

## 📋 Tech Stack

- **Frontend:** React 18, Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Database:** SQLite with Prisma ORM
- **Authentication:** JWT + bcrypt
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Language:** TypeScript

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up database
npx prisma generate
npx prisma db push
npx prisma db seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 🔐 Test Accounts

After running seed:

- **Admin:** admin@4thman.com / admin123
- **Seller:** seller@4thman.com / seller123
- **Buyer:** buyer@4thman.com / buyer123

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # API Routes (auth, products, cart)
│   ├── auth/             # Authentication pages
│   ├── products/         # Product listing and detail pages
│   ├── cart/             # Shopping cart page
│   ├── dashboard/        # Seller dashboard
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable React components
└── app/globals.css       # Global styles

prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Database seeding script
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Database
npx prisma db push      # Sync schema with database
npx prisma db seed      # Seed with sample data
npx prisma studio      # Open Prisma Studio GUI
```

## 📱 Pages

- `/` - Home landing page
- `/products` - Product listing with search and filters
- `/products/[id]` - Product detail page
- `/cart` - Shopping cart
- `/auth/login` - User login
- `/auth/register` - User registration
- `/dashboard` - Seller dashboard (admin only)

## 🔌 API Routes

- `POST /api/auth` - Login/Register
- `GET /api/products` - Get products with filters
- `GET /api/products/[id]` - Get product details
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart

## 🎨 Customization

### Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  brand: { blue: '#2563EB', gold: '#F59E0B' }
}
```

### Database
Modify `prisma/schema.prisma` and run:
```bash
npx prisma db push
```

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

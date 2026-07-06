# 4thMan Marketplace App

The main e-commerce application for the 4thMan global marketplace.

## 📖 Quick Start

```bash
# From repo root
cd apps/marketplace

# Install dependencies
npm install

# Set up database
npx prisma generate
npx prisma db push
npx prisma db seed

# Start development
npm run dev
```

Visit `http://localhost:3000`

## 🔐 Test Accounts

- **Buyer:** buyer@4thman.com / buyer123
- **Seller:** seller@4thman.com / seller123
- **Admin:** admin@4thman.com / admin123

## 📂 Structure

- `src/app/` - Next.js app pages and layouts
- `src/components/` - React components
- `prisma/` - Database schema and seeds
- `public/` - Static assets

## 🚀 Available Commands

```bash
npm run dev       # Development server
npm run build     # Production build
npm run start     # Production server
npm run lint      # Lint code
```

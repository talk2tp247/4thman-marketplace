package.json

{
  "name": "4thman-marketplace",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "db:push": "prisma db push",
    "db:seed": "prisma db seed",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@prisma/client": "^5.8.0",
    "bcryptjs": "^2.4.3",
    "lucide-react": "^0.344.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/react": "^18.2.48",
    "@types/node": "^20.11.5",
    "@types/bcryptjs": "^2.4.6",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.33",
    "autoprefixer": "^10.4.17",
    "prisma": "^5.8.0"
  },
  "prisma": {
    "seed": "prisma/seed.ts"
  }
}
File 2: tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { blue: '#2563EB', gold: '#F59E0B' },
        surface: '#F8FAFC',
        text: '#1F2937',
      },
    },
  },
  plugins: [],
};
File 3: next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig
File 4: postcss.config.js

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
File 5: tsconfig.json

{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
File 6: .env

DATABASE_URL="file:./dev.db"
JWT_SECRET="4thMan-Secret-2024"
File 7: prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  name          String
  email         String   @unique
  password      String
  accountType   String   @default("buyer")
  storeName     String?
  avatar        String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  products      Product[]
  orders        Order[]  @relation("BuyerOrders")
  sellerOrders  Order[]  @relation("SellerOrders")
  reviews       Review[]
  notifications Notification[]
  cartItems     CartItem[]
}

model Product {
  id            String   @id @default(cuid())
  title         String
  description   String
  category      String
  price         Float
  comparePrice  Float?
  productType   String   @default("digital")
  stock         String   @default("unlimited")
  fileUrl       String?
  image         String   @default("📦")
  tags          String   @default("")
  status        String   @default("active")
  rating        Float    @default(0)
  reviewCount   Int      @default(0)
  salesCount    Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  sellerId      String
  seller        User     @relation(fields: [sellerId], references: [id])
  reviews       Review[]
  cartItems     CartItem[]
  orderItems    OrderItem[]
}

model Order {
  id              String   @id @default(cuid())
  orderNumber     String   @unique
  status          String   @default("pending")
  total           Float
  discount        Float    @default(0)
  shippingAddress String?
  city            String?
  state           String?
  zip             String?
  country         String?
  trackingNumber  String?
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  buyerId         String
  sellerId        String
  buyer           User     @relation("BuyerOrders", fields: [buyerId], references: [id])
  seller          User     @relation("SellerOrders", fields: [sellerId], references: [id])
  items           OrderItem[]
}

model OrderItem {
  id        String  @id @default(cuid())
  quantity  Int     @default(1)
  price     Float
  orderId   String
  productId String
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])
}

model Review {
  id        String   @id @default(cuid())
  rating    Int
  text      String
  helpful   Int      @default(0)
  verified  Boolean  @default(true)
  createdAt DateTime @default(now())
  userId    String
  productId String
  user      User     @relation(fields: [userId], references: [id])
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  @@unique([userId, productId])
}

model CartItem {
  id        String @id @default(cuid())
  quantity  Int    @default(1)
  userId    String
  productId String
  user      User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  @@unique([userId, productId])
}

model Notification {
  id          String   @id @default(cuid())
  type        String
  title       String
  description String
  read        Boolean  @default(false)
  actionUrl   String?
  createdAt   DateTime @default(now())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
File 8: prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10)
  const sellerPassword = await bcrypt.hash('seller123', 10)
  const buyerPassword = await bcrypt.hash('buyer123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@4thman.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@4thman.com', password: adminPassword, accountType: 'admin' }
  })

  const seller = await prisma.user.upsert({
    where: { email: 'seller@4thman.com' },
    update: {},
    create: { name: 'TechEdu Store', email: 'seller@4thman.com', password: sellerPassword, accountType: 'seller', storeName: 'TechEdu Store' }
  })

  await prisma.user.upsert({
    where: { email: 'buyer@4thman.com' },
    update: {},
    create: { name: 'John Doe', email: 'buyer@4thman.com', password: buyerPassword, accountType: 'buyer' }
  })

  await prisma.product.create({
    data: { title: 'Ultimate Web Dev Course', description: 'Master web development from scratch.', category: 'Online Courses', price: 49.99, comparePrice: 79.99, productType: 'digital', image: '🎓', rating: 4.8, reviewCount: 342, salesCount: 1523, sellerId: seller.id }
  })

  await prisma.product.create({
    data: { title: 'Business Pro Template Pack', description: 'Professional business templates.', category: 'Templates', price: 29.99, comparePrice: 49.99, productType: 'digital', image: '📁', rating: 4.6, reviewCount: 128, salesCount: 876, sellerId: seller.id }
  })

  await prisma.product.create({
    data: { title: 'Digital Marketing eBook', description: 'Complete guide to digital marketing.', category: 'eBooks', price: 19.99, comparePrice: 34.99, productType: 'digital', image: '📚', rating: 4.9, reviewCount: 567, salesCount: 2341, sellerId: seller.id }
  })

  console.log('✅ Seed data created!')
}

main().catch(console.error).finally(() => prisma.$disconnect())

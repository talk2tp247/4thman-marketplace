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
    data: { title: 'Ultimate Web Dev Course', description: 'Master web development from scratch.', category: 'Online Courses', price: 49.99, comparePrice: 79.99, productType: 'digital', image: '🎓', sellerId: seller.id, rating: 4.8, reviewCount: 342, salesCount: 150 }
  })

  await prisma.product.create({
    data: { title: 'Business Pro Template Pack', description: 'Professional business templates.', category: 'Templates', price: 29.99, comparePrice: 49.99, productType: 'digital', image: '📁', sellerId: seller.id, rating: 4.6, reviewCount: 128, salesCount: 95 }
  })

  await prisma.product.create({
    data: { title: 'Digital Marketing eBook', description: 'Complete guide to digital marketing.', category: 'eBooks', price: 19.99, comparePrice: 34.99, productType: 'digital', image: '📚', sellerId: seller.id, rating: 4.9, reviewCount: 567, salesCount: 320 }
  })

  console.log('✅ Seed data created!')
}

main().catch(console.error).finally(() => prisma.$disconnect())

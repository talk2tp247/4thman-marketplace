import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || '4thMan-Secret-2024'

export async function POST(req: NextRequest) {
  try {
    const { action, email, password, name, accountType } = await req.json()

    if (action === 'register') {
      const existingUser = await prisma.user.findUnique({ where: { email } })
      if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          accountType: accountType || 'buyer',
        },
      })

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET)
      return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name }, token })
    }

    if (action === 'login') {
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET)
      return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, accountType: user.accountType }, token })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

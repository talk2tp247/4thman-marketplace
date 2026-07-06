import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || '4thMan-Secret-2024'

function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
    return decoded.id
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1]
    const userId = token ? getUserFromToken(token) : null

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    })

    return NextResponse.json(cartItems)
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1]
    const userId = token ? getUserFromToken(token) : null

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId, quantity } = await req.json()

    const existingItem = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    })

    if (existingItem) {
      const updated = await prisma.cartItem.update({
        where: { userId_productId: { userId, productId } },
        data: { quantity: existingItem.quantity + quantity },
      })
      return NextResponse.json(updated)
    }

    const cartItem = await prisma.cartItem.create({
      data: { userId, productId, quantity },
    })

    return NextResponse.json(cartItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

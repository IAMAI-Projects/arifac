import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
})
const adapter = new PrismaPg(pool)

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['query'],
    transactionOptions: {
      maxWait: 10000,
      timeout: 30000,
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

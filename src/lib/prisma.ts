import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
<<<<<<< HEAD
import { Pool } from 'pg'
=======
import pg from 'pg'
>>>>>>> 6dd4a68fb6d393323b470b145ca8bc25d963edbb

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

<<<<<<< HEAD
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
=======
const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
>>>>>>> 6dd4a68fb6d393323b470b145ca8bc25d963edbb
const adapter = new PrismaPg(pool as any)

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

// Reloading prisma client
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

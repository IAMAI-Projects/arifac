import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

// Cache both pool and prisma on the global object so HMR does not create new
// connections on every hot reload, which would exhaust the RDS connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient; pgPool: pg.Pool }

const pool =
  globalForPrisma.pgPool ||
  new pg.Pool({
    connectionString,
    ssl: connectionString.includes('localhost') || connectionString.includes('127.0.0.1')
      ? false
      : { rejectUnauthorized: false },
  })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = new PrismaPg(pool as any)

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['query'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.pgPool = pool
  globalForPrisma.prisma = prisma
}

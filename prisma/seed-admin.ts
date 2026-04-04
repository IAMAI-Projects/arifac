import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'

const connectionString = process.env.DATABASE_URL
const pool = new pg.Pool({
  connectionString,
  ssl: connectionString?.includes('localhost') || connectionString?.includes('127.0.0.1')
    ? false
    : { rejectUnauthorized: false },
})
const adapter = new PrismaPg(pool as any)
const prisma = new PrismaClient({ adapter })

async function main() {
  const adminData = [
    {
      email: 'admin@arifac.in',
      password: 'Admin@123',
      role: 'ARIFAC_ADMIN' as const,
    },
    {
      email: 'help.arifac@iamai.in',
      password: '123456',
      role: 'ARIFAC_ADMIN' as const,
    },
    {
      email: 'admin-arifac@iamai.in',
      password: '123456',
      role: 'Admin' as const,
    },
  ];

  for (const admin of adminData) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    const result = await prisma.admin.upsert({
      where: { email: admin.email },
      update: { password: hashedPassword },
      create: {
        email: admin.email,
        password: hashedPassword,
        role: admin.role,
      },
    });
    console.log({ admin: { id: result.id, email: result.email, role: result.role } });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  });

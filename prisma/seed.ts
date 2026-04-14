import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'

const connectionString = process.env.DATABASE_URL

async function main() {
  const pool = new pg.Pool({
    connectionString,
    ssl: connectionString?.includes('localhost') || connectionString?.includes('127.0.0.1')
      ? false
      : { rejectUnauthorized: false },
  })
  const adapter = new PrismaPg(pool as any)
  const prisma = new PrismaClient({ adapter })

  try {
    const orgs = [
      {
        name: 'ICICI Bank',
        sector: 'Banking',
        entity_type: 'Public Limited Company',
        registered_address: 'Mumbai, India',
        regulated_entity: true,
        identifier_type: 'PAN',
        identifier_value: 'ICICI12345',
      },
      {
        name: 'HDFC Bank',
        sector: 'Banking',
        entity_type: 'Public Limited Company',
        registered_address: 'Mumbai, India',
        regulated_entity: true,
        identifier_type: 'PAN',
        identifier_value: 'HDFC12345',
      },
      {
        name: 'Axis Bank',
        sector: 'Banking',
        entity_type: 'Public Limited Company',
        registered_address: 'Mumbai, India',
        regulated_entity: true,
        identifier_type: 'PAN',
        identifier_value: 'AXIS12345',
      },
    ]

    for (const org of orgs) {
      await prisma.organisations.upsert({
        where: {
          identifier_type_identifier_value: {
            identifier_type: org.identifier_type as any,
            identifier_value: org.identifier_value,
          },
        },
        update: {},
        create: org as any,
      })
    }

    const adminData = [
      {
        email: 'admin@arifac.in',
        password: 'Admin@123',
        role: 'ARIFAC_ADMIN'
      },
      {
        email: 'help.arifac@iamai.in',
        password: '123456',
        role: 'ARIFAC_ADMIN'
      },
      {
        email: 'admin-arifac@iamai.in',
        password: '123456',
        role: 'Admin'
      }
    ];

    for (const admin of adminData) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await prisma.admin.upsert({
        where: { email: admin.email },
        update: { password: hashedPassword },
        create: {
          email: admin.email,
          password: hashedPassword,
          role: admin.role as any,
        },
      });
    }

    console.log('Seed data inserted successfully including admins');
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })

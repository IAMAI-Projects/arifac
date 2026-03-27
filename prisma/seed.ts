import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
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

  console.log('Seed data inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

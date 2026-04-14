import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const usersCount = await prisma.users.count()
  const appsCount = await prisma.membership_applications.count()
  const users = await prisma.users.findMany({
    take: 5,
    include: {
      membership_applications: true
    }
  })

  console.log('Total Users:', usersCount)
  console.log('Total Applications:', appsCount)
  console.log('Sample Users and their App Counts:')
  users.forEach(u => {
    console.log(`- ${u.email}: ${u.membership_applications.length} apps`)
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

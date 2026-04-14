const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.users.findMany({ select: { id: true, email: true } })
  const apps = await prisma.membership_applications.findMany({ select: { id: true, user_id: true } })
  console.log('--- Users ---')
  console.log(users)
  console.log('--- Applications ---')
  console.log(apps)
}

main().catch(console.error).finally(() => prisma.$disconnect())

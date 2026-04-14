const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('--- DB STATS ---')
  console.log('Users:', await prisma.users.count())
  console.log('Organisations:', await prisma.organisations.count())
  console.log('Applications:', await prisma.membership_applications.count())
  console.log('App Details:', await prisma.application_details.count())
  
  const lastUser = await prisma.users.findFirst({ orderBy: { created_at: 'desc' } })
  console.log('Latest User:', lastUser?.email)
  
  if (lastUser) {
    const userApps = await prisma.membership_applications.findMany({ where: { user_id: lastUser.id } })
    console.log(`Apps for latest user (${lastUser.id}):`, userApps.length)
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())

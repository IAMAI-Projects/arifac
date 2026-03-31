
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Since the project uses @prisma/adapter-pg, we might need it, but for a simple script, we'll try to just use direct connection if possible,
// or we'll use the existing singleton if we can import it.
// Actually, I'll just write a simple script that doesn't depend on the app's Prisma structure if possible.

// But wait, the project requires an adapter.
// I'll use the same setup as in my previous seed script but fix the data.

const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const databaseUrl = 'postgresql://postgres:postgres@localhost:5432/arifac-membership';
const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'admin@iamai.in';
  const hashedPassword = await bcrypt.hash('123456', 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      email,
      password: hashedPassword,
      role: 'Admin', // This is now a valid role in our enum.
    },
  });

  console.log('Seeded admin:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

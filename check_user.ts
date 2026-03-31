
import { prisma } from './src/lib/prisma';

async function check() {
  const user = await prisma.user.findUnique({
    where: { email: 'avanish@fintechcouncil.in' }
  });
  console.log('User status:', user?.status);
}

check();

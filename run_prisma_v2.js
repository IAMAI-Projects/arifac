const { execSync } = require('child_process');
require('dotenv').config();

process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/arifac-membership";

try {
  const output = execSync('npx prisma db push --accept-data-loss --skip-seed', { 
    encoding: 'utf-8', 
    cwd: 'D:\\Github\\arifac',
    stdio: 'inherit'
  });
} catch (error) {
  process.exit(1);
}

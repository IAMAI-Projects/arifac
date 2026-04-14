const { execSync } = require('child_process');

try {
  const output = execSync('npx prisma db push --accept-data-loss', { encoding: 'utf-8', cwd: 'D:\\Github\\arifac' });
  console.log(output);
} catch (error) {
  console.error('Error executing prisma db push:');
  console.error(error.stdout);
  console.error(error.stderr);
}

const { execSync } = require('child_process');

try {
    console.log('Running prisma db push --accept-data-loss...');
    // We use the full path to avoid any confusion.
    const output = execSync('npx prisma db push --accept-data-loss --schema=prisma/schema.prisma', {
        encoding: 'utf-8',
        cwd: 'D:\\Github\\arifac'
    });
    console.log('Output:', output);
} catch (error) {
    console.error('Error running prisma db push:');
    console.error(error.stdout);
    console.error(error.stderr);
    process.exit(1);
}

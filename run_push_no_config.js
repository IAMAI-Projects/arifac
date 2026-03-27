const fs = require('fs');
const { execSync } = require('child_process');

try {
    if (fs.existsSync('prisma.config.ts')) {
        console.log('Renaming prisma.config.ts to prisma.config.ts.bak');
        fs.renameSync('prisma.config.ts', 'prisma.config.ts.bak');
    }
    
    console.log('Running prisma db push --accept-data-loss --schema=prisma/schema.prisma...');
    const output = execSync('npx prisma db push --accept-data-loss --schema=prisma/schema.prisma', {
        encoding: 'utf-8',
        cwd: 'D:\\Github\\arifac'
    });
    console.log('Output:', output);
    
    if (fs.existsSync('prisma.config.ts.bak')) {
        console.log('Renaming prisma.config.ts.bak back to prisma.config.ts');
        fs.renameSync('prisma.config.ts.bak', 'prisma.config.ts');
    }
} catch (error) {
    if (fs.existsSync('prisma.config.ts.bak')) {
        fs.renameSync('prisma.config.ts.bak', 'prisma.config.ts');
    }
    console.error('Error:', error.stdout || error.message);
    process.exit(1);
}

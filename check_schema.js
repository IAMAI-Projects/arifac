const fs = require('fs');
const content = fs.readFileSync('prisma/schema.prisma', 'utf8');
const lines = content.split('\n');
for (let i = 0; i < 10; i++) {
    console.log(`${i+1}: ${lines[i]} (Len: ${lines[i]?.length})`);
    if (lines[i]) console.log(Buffer.from(lines[i]).toString('hex'));
}

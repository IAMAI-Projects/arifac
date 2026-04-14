const fs = require('fs');
const buffer = fs.readFileSync('prisma/schema.prisma');
console.log(buffer.slice(0, 100).toString('hex'));
console.log(buffer.slice(0, 100).toString('utf8'));

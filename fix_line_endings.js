const fs = require('fs');
const content = fs.readFileSync('prisma/schema.prisma', 'utf8');
const newContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
fs.writeFileSync('prisma/schema.prisma', newContent, 'utf8');
console.log('Fixed line endings in schema.prisma');

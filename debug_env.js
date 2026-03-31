require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded' : 'Not Loaded');
if (process.env.DATABASE_URL) {
    console.log('URL:', process.env.DATABASE_URL);
}

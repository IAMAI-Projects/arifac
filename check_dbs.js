const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://postgres:postgres@localhost:5432/postgres" // Connect to default postgres DB first
});

async function main() {
  await client.connect();
  const res = await client.query("SELECT datname FROM pg_database");
  console.log(res.rows.map(r => r.datname));
  await client.end();
}

main().catch(console.error);

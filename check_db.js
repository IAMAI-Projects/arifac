const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://postgres:postgres@localhost:5432/arifac-membership"
});

async function main() {
  await client.connect();
  const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
  console.log(res.rows);
  await client.end();
}

main().catch(console.error);

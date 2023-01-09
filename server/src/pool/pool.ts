import { Pool } from 'pg';

const db = new Pool({
  host: process.env.RDS_HOSTNAME,
  port: Number(process.env.RDS_PORT),
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
});
export default db;

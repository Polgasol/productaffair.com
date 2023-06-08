import { Pool } from 'pg';
// import dotenv from 'dotenv';

// if (process.env.NODE_ENV === 'production') {
//   console.log(`checking for process.env variables postgresql in production environment`);
//   console.log(`Redis host => ${process.env.RDS_HOSTNAME}`);
//   console.log(`Redis port => ${process.env.RDS_PORT}`);
//   console.log(`Redis username => ${process.env.RDS_USERNAME}`);
//   console.log(`Redis database => ${process.env.RDS_DB_NAME}`);
// }
// if (process.env.NODE_ENV === 'development') {
//   dotenv.config();
//   console.log(`Checking for ennvironment variables in postgresql in development environment`);
//   console.log(`Postgres host => ${process.env.POSTGRES_HOST}`);
//   console.log(`Postgres port => ${process.env.POSTGRES_PORT}`);
//   console.log(`Postgres username => ${process.env.POSTGRES_USER}`);
//   console.log(`Postgres database => ${process.env.POSTGRES_DB}`);
// }

// const db = new Pool({
//   host: process.env.NODE_ENV === 'production' ? process.env.RDS_HOSTNAME : process.env.POSTGRES_HOST,
//   port: process.env.NODE_ENV === 'production' ? Number(process.env.RDS_PORT) : Number(process.env.POSTGRES_PORT), // changed type string | undefined | number
//   user: process.env.NODE_ENV === 'production' ? process.env.RDS_USERNAME : process.env.POSTGRES_USER,
//   password: process.env.NODE_ENV === 'production' ? process.env.RDS_PASSWORD : process.env.POSTGRES_PASSWORD,
//   database: process.env.NODE_ENV === 'production' ? process.env.RDS_DB_NAME : process.env.POSTGRES_DB,
// });
const db = new Pool({
  host: process.env.RDS_HOSTNAME,
  port: Number(process.env.RDS_PORT), // changed type string | undefined | number
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
});

export default db;

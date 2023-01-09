"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const db = new pg_1.Pool({
    host: process.env.RDS_HOSTNAME,
    port: Number(process.env.RDS_PORT),
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
});
exports.default = db;
//# sourceMappingURL=pool.js.map
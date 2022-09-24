import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
}));

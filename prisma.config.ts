import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const config = dotenv.config();
dotenvExpand.expand(config);

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['POSTGRES_URI'],
  },
});
